import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Toaster } from "sonner";
import { CustomCursor } from "./CustomCursor";
import { ScrollProgress } from "./ScrollProgress";

export function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 noise">
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Toaster position="top-right" richColors />
    </div>
  );
}
