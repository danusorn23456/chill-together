import { Container, PixiRef, Sprite, _ReactPixi, useTick } from "@pixi/react";
import { useRef } from "react";

export interface AnimatedCharacterProps {
  src: _ReactPixi.WithSource["image"];
}
function AnimatedCharacter({ src }: AnimatedCharacterProps) {
  const spriteRef = useRef<PixiRef<typeof Sprite>>(null);
  const direction = useRef(1);

  useTick((delta) => {
    // if (spriteRef.current) {
    //   let prevRotation = spriteRef.current.rotation;
    //   if (prevRotation >= 10) {
    //     direction.current = -1;
    //   } else if (prevRotation <= -10) {
    //     direction.current = +1;
    //   }
    //   console.log(prevRotation);
    // }
  });

  return (
    <Container width={10} height={10} x={100} y={10}>
      <Sprite ref={spriteRef} image={src} scale={0.5} rotation={0} />
    </Container>
  );
}

export { AnimatedCharacter };
