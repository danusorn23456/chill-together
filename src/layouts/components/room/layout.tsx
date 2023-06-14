import { ReactNode } from "react";
import { NavBar } from "./nav-bar";

export interface RoomLayoutProps {
  children: ReactNode;
}

function RoomLayout({ children }: RoomLayoutProps) {
  return (
    <div className="h-screen w-full flex flex-col">
      <NavBar />
      {children}
    </div>
  );
}

export { RoomLayout };
