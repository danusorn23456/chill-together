import { useRecoilValue } from "recoil";
import { layoutState } from "../store";

export interface NavBarProps {}

function NavBar({}: NavBarProps) {
  const layoutInfo = useRecoilValue(layoutState);

  return (
    <div className="fixed z-10 flex w-full bg-gray-900 h-10 border-b border-gray-950">
      <div className="flex-1 md:border-r border-gray-950 flex items-center p-2">
        <h2 className="text-gray-300 text-xs md:text-md">{layoutInfo.title}</h2>
      </div>
      <div className="ml-auto w-60 lg:w-96"></div>
    </div>
  );
}

export { NavBar };
