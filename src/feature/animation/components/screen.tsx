import { Canvas } from "@react-three/fiber";
import backgroundSource from "~/feature/common/assets/bg.jpg";
import { ReactNode } from "react";
import { AbsoluteCenter } from "~/feature/common";

export interface ScreenProps {
  children?: ReactNode;
  render?: ReactNode;
}

const Screen = ({ children, render }: ScreenProps) => {
  return (
    <div className="w-full h-full relative">
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${backgroundSource})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3">
        <Canvas>
          <perspectiveCamera position={[0, 0, 1.5]}>{render}</perspectiveCamera>
        </Canvas>
      </div>
      <AbsoluteCenter>{children}</AbsoluteCenter>
    </div>
  );
};

export { Screen };
