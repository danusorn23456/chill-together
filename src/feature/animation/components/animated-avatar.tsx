import { Text, useTexture } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { randomBetween } from "~/feature/common";

export interface AnimatedAvatarProps {
  name: string;
  src: string;
  prefix?: string;
  coordinates: number[];
}

function AnimatedAvatar({
  name,
  prefix,
  src,
  coordinates = [0, 0, 0],
}: AnimatedAvatarProps) {
  const [x, y, z] = coordinates;
  const texture = useTexture(src);
  /**this delay is for extra delay*/
  const delay = randomBetween(0.1, 0.5);
  const delayBeforeJump = 3;

  return (
    <>
      <motion.sprite
        position={[x, y, z]}
        animate={{
          scaleX: 0.95,
          y: [y, y + 0.6, y],
          transition: {
            repeat: Infinity,
            duration: 1,
            repeatDelay: delayBeforeJump + delay,
            repeatType: "reverse",
            scaleX: {
              repeat: Infinity,
              duration: 0.3,
              repeatType: "reverse",
            },
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
            repeatDelay: delayBeforeJump + delay,
            repeatType: "loop",
          }}
          map={texture}
        />
      </motion.sprite>
      <Text
        color={prefix ? "#f757c7" : "#ffffff"}
        scale={0.2}
        position={[x, y - 0.7, z]}
      >
        {prefix ? `${prefix} ` : ""}
        {name}
      </Text>
    </>
  );
}

export { AnimatedAvatar };
