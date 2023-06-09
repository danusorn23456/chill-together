import { Stage } from "@pixi/react";
import { AnimatedCharacter } from "~/feature/character";
import { useRecoilValue } from "recoil";
import { usersInRoomState } from "../store";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { _ReactPixi } from "@pixi/react";

export interface ScreenProps {}

function Screen({}: ScreenProps) {
  const [size, setSize] = useState([0, 0]);
  const users = useRecoilValue(usersInRoomState);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const resizeTimerRef = useRef<NodeJS.Timeout>();

  function handleResize() {
    clearTimeout(resizeTimerRef.current);
    resizeTimerRef.current = setTimeout(() => {
      if (!wrapperRef.current) return;
      const { width, height } = wrapperRef.current.getBoundingClientRect();
      setSize([width, height]);
    }, 200);
  }

  useLayoutEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      id="stage-wrapper"
      className="w-full h-full bg-green-200 z-0"
    >
      <span className="sr-only">
        Image by{" "}
        <a href="https://www.freepik.com/free-vector/abstract-neon-lights-background_9840044.htm#page=5&query=perspective%20galaxy&position=0&from_view=search&track=ais">
          Freepik
        </a>
      </span>
    </div>
  );
}

export { Screen };
