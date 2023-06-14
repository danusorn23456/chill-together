import { HTMLAttributes } from "react";

export interface AbsoluteCenterProps extends HTMLAttributes<HTMLDivElement> {}

function AbsoluteCenter({ children, ...rest }: AbsoluteCenterProps) {
  return (
    <div
      {...rest}
      className={[
        "w-full h-full flex items-center justify-center flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        rest?.className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export { AbsoluteCenter };
