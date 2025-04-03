import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function CustomSidebarProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="p-4">
      <AppSidebar />
      <main className="w-full h-[calc(100vh-32px)]">
        <SidebarTrigger className="absolute bg-primary-foreground text-black w-10 h-10 z-40 rounded-full md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}