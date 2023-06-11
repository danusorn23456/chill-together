import { RoomBanner } from "~/feature/room";

export interface NavBarProps {}

function NavBar({}: NavBarProps) {
  return (
    <div className="flex fixed z-10 w-full">
      <div className="ml-auto w-60 lg:w-96 bg-black/30"></div>
    </div>
  );
}

export { NavBar };
