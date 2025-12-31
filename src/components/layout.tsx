import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-root">
      <main className="layout-main">
        {children}
      </main>
    </div>
  );
}
