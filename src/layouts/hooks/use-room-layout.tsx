import { useRecoilState, useResetRecoilState } from "recoil";
import { roomLayoutState } from "..";

export interface RoomLayoutProps {}

function useRoomLayout({}: RoomLayoutProps) {
  const [, setLayout] = useRecoilState(roomLayoutState);

  const reset = useResetRecoilState(roomLayoutState);

  function setTimer(timeString?: string) {
    setLayout((prev) => ({
      ...prev,
      timer: timeString || "",
    }));
  }

  function setTitle(title?: string) {
    if (!title) return;
    setLayout((prev) => ({
      ...prev,
      title: (
        <span className="flex items-center space-x-1">
          <span>
            <span>
              <span className="text-pink-500">Listen to : </span>
              <span>{title}</span>
            </span>
          </span>
        </span>
      ),
    }));
  }

  return {
    setTimer,
    setTitle,
    reset,
  };
}

export { useRoomLayout };
