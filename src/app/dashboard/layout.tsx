import { StoreProvider } from "@/lib/store";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 lg:ml-64 min-h-screen">
          <main className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </StoreProvider>
  );
}
