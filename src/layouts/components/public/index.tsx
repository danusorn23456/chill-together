import { ReactNode } from "react";

export interface PublicLayoutProps {
  children: ReactNode;
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="w-full min-h-screen bg-gray-900 relative">{children}</div>
  );
}

export { PublicLayout };
