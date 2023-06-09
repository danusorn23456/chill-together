import { CSSProperties } from "react";

export interface AvatarProps {
  src: string;
  alt?: string;
  width: CSSProperties["width"];
  height: CSSProperties["height"];
}

function Avatar({ src, alt, width, height }: AvatarProps) {
  return (
    <div className="rounded-full overflow-hidden border w-fit h-fit">
      <img
        width={width}
        height={height}
        src={src}
        alt={`avatar${alt ? `-${alt}` : ""}`}
      />
    </div>
  );
}

export { Avatar };
