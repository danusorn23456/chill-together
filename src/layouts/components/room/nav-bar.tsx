import { useRecoilValue } from "recoil";
import { roomLayoutState } from "~/layouts";

export interface NavBarProps {}

function NavBar({}: NavBarProps) {
  const { timer, title } = useRecoilValue(roomLayoutState);

  return (
    <div className="fixed z-10 flex w-full bg-gray-900 h-10 border-b border-gray-950">
      <div className="flex-1 md:border-r border-gray-950 flex items-center p-2 space-x-1">
        <h2 className="text-gray-300 text-xs md:text-md">
          {title || "waiting for some music"}
        </h2>
        {title && timer ? (
          <span className="text-gray-500 text-xs">{timer}</span>
        ) : (
          <></>
        )}
      </div>
      <div className="ml-auto w-60 lg:w-96"></div>
    </div>
  );
}

export { NavBar };
