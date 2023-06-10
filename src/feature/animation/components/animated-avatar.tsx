import { useTexture } from "@react-three/drei";
import { UserInRoom } from "~/feature/room/store";

export interface AnimatedAvatarProps {}

function AnimatedAvatar(user: UserInRoom) {
  const texture = useTexture(user.avatar_url);

  return (
    <sprite position={user.coordinates}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
}

export { AnimatedAvatar };
