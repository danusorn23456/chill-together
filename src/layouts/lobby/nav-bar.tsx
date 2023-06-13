import { ArrowLeftOnRectangleIcon } from "@heroicons/react/20/solid";
import { supabase } from "~/feature/common";

export interface NavBarProps {}

function NavBar({}: NavBarProps) {
  function handleSignout() {
    supabase.auth.signOut();
  }
  return (
    <div className="fixed z-10 flex w-full bg-gray-900 h-10 border-b border-gray-950">
      <div className="relative flex justify-between w-full">
        <div className="flex-1"></div>
        <div className="flex-1 flex justify-end">
          <ArrowLeftOnRectangleIcon className="ml-auto fill-red-500 w-10 h-10 p-2" />
          <button
            onClick={handleSignout}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

export { NavBar };
