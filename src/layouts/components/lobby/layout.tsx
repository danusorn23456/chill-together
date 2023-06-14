import { ReactNode } from "react";
import { NavBar } from "./nav-bar";

export interface LobbyLayoutProps {
  children: ReactNode;
}

function LobbyLayout({ children }: LobbyLayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}

export { LobbyLayout };
