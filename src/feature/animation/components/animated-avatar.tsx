import { Text, useTexture } from "@react-three/drei";
import { UserInRoom } from "~/feature/room";
import { motion } from "framer-motion-3d";
import { randomBetween } from "~/feature/common";

export interface AnimatedAvatarProps {}

function AnimatedAvatar(user: UserInRoom) {
  const [x, y, z] = user.coordinates;
  const texture = useTexture(user.avatar_url);
  const delay = randomBetween(1.1, 2.2);

  return (
    <>
      <motion.sprite
        whileHover={{
          scale: 1.2,
        }}
        position={[x, y, z]}
        animate={{
          y: [y, y + 1, y],
          transition: {
            repeat: Infinity,
            duration: 1,
            repeatDelay: 5 + delay,
            repeatType: "reverse",
          },
        }}
      >
        <motion.spriteMaterial
          rotation={0}
          animate={
            {
              rotation: [0, Math.PI * 2],
            } as any
          }
          transition={{
            repeat: Infinity,
            duration: 1,
            repeatDelay: 5 + delay,
            repeatType: "loop",
          }}
          map={texture}
        />
      </motion.sprite>
      <Text color="white" scale={0.2} position={[x, y - 0.7, z]}>
        {user.username}
      </Text>
    </>
  );
}

export { AnimatedAvatar };
