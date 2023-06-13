import { Canvas } from "@react-three/fiber";
import { AnimatedAvatar } from ".";
import { useRecoilValue } from "recoil";
import { usersInRoomState } from "~/feature/room/store";
import backgroundSource from "~/feature/common/assets/bg.jpg";
import { ReactNode } from "react";

export interface ScreenProps {
  children?: ReactNode;
}

function Screen({ children }: ScreenProps) {
  const users = useRecoilValue(usersInRoomState);

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
      />
      {children}
      <div className="absolute bottom-0 left-0 w-full h-1/3">
        <Canvas>
          <perspectiveCamera position={[0, 0, 1.5]}>
            {users.map((user) => (
              <AnimatedAvatar key={user.id} {...user} />
            ))}
          </perspectiveCamera>
        </Canvas>
      </div>
    </div>
  );
}

export { Screen };
