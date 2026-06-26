import type { Entry } from "@/lib/types";

const AI_API = "https://sodeom.com/v1/chat/completions";

interface RequestBody {
  entries: Entry[];
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
}

export async function POST(request: Request) {
  let body: RequestBody | undefined;

  try {
    body = await request.json() as RequestBody;

    if (!body.entries || body.entries.length === 0) {
      return Response.json({ error: "No entries provided" }, { status: 400 });
    }

    const totalEntries = body.entries.length;
    const incomeCount = body.entries.filter((e) => e.type === "income").length;
    const expenseCount = body.entries.filter((e) => e.type === "expense").length;
    const topCategory = [...body.entries]
      .filter((e) => e.type === "expense")
      .reduce<Record<string, number>>((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {});

    const topExpenseCategory =
      Object.entries(topCategory).sort(([, a], [, b]) => b - a)[0]?.[0] ||
      "N/A";

    const prompt = `You are a financial analyst. Analyze this small business data and return exactly 3 concise, actionable insights in simple English. Format as a JSON array of strings.

Business Financial Data:
- Total Income: $${body.totalIncome.toFixed(2)}
- Total Expenses: $${body.totalExpenses.toFixed(2)}
- Net Profit: $${body.netProfit.toFixed(2)}
- Profit Margin: ${body.profitMargin.toFixed(1)}%
- Total Transactions: ${totalEntries} (${incomeCount} income, ${expenseCount} expenses)
- Top Expense Category: ${topExpenseCategory}

Return ONLY a JSON object with key "insights" containing an array of exactly 3 strings. Each insight should be 1-2 sentences, practical, and specific to this data.`;

    const response = await fetch(AI_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a practical financial analyst. Return only valid JSON.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("AI API error:", errorData);
      return getFallbackInsights(body);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || data.answer || "";

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return getFallbackInsights(body);
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const insights = parsed.insights || parsed.Insights || [];

    if (!Array.isArray(insights) || insights.length === 0) {
      return getFallbackInsights(body);
    }

    return Response.json({ insights: insights.slice(0, 3) });
  } catch (error) {
    console.error("Insights API error:", error);
    if (body?.entries) {
      return getFallbackInsights(body);
    }
    return Response.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}

function getFallbackInsights(body: RequestBody) {
  const isProfitable = body.netProfit > 0;
  const margin = body.profitMargin;
  const insights: string[] = [];

  if (isProfitable) {
    insights.push(
      `Your business is profitable with a ${margin.toFixed(1)}% profit margin. Consider reinvesting some profits into growth areas like marketing or product development.`
    );
  } else {
    insights.push(
      `Your expenses match or exceed your income. Review your top expense categories and identify areas where you can reduce costs or increase pricing.`
    );
  }

  const incomeCount = body.entries.filter((e) => e.type === "income").length;
  const expenseCount = body.entries.filter((e) => e.type === "expense").length;

  if (incomeCount < expenseCount) {
    insights.push(
      `You have more expense transactions (${expenseCount}) than income transactions (${incomeCount}). Consider diversifying your revenue streams or increasing your pricing to improve the ratio.`
    );
  } else {
    insights.push(
      `Your income and expense transaction volume looks balanced. Keep monitoring your cash flow regularly to maintain financial health.`
    );
  }

  const topCategory = [...body.entries]
    .filter((e) => e.type === "expense")
    .reduce<Record<string, number>>((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});

  const top = Object.entries(topCategory).sort(([, a], [, b]) => b - a)[0];
  if (top) {
    insights.push(
      `Your highest expense category is "${top[0]}" at $${top[1].toFixed(2)}. Review if this spending is generating proportional value for your business.`
    );
  }

  return Response.json({ insights });
}
