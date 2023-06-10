import { useTexture } from "@react-three/drei";
import { UserInRoom } from "~/feature/room";
import { motion } from "framer-motion-3d";
import { SpriteMaterialProps } from "@react-three/fiber";
import { SpriteMaterial, SpriteMaterialParameters } from "three";

export interface AnimatedAvatarProps {}

function AnimatedAvatar(user: UserInRoom) {
  const [x, y, z] = user.coordinates;
  const texture = useTexture(user.avatar_url);

  return (
    <motion.sprite
      position={[x, y, z]}
      animate={{ y: y + 0.1 }}
      transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
    >
      <motion.spriteMaterial
        rotation={-0.1}
        animate={
          {
            rotation: 0.1,
          } as any
        }
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        map={texture}
      />
    </motion.sprite>
  );
}

export { AnimatedAvatar };
