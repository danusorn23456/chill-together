import { HTMLAttributes } from "react";

export interface VideoRatioBoxProps extends HTMLAttributes<HTMLDivElement> {}

function VideoRatioBox({ children, ...rest }: VideoRatioBoxProps) {
  return (
    <div
      className={[
        "w-full max-w-sm sm:max-w-sm md:max-w-md mx-2 aspect-video relative z-20 bg-gray-900 flex items-center rounded-md",
        rest?.className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

export { VideoRatioBox };
