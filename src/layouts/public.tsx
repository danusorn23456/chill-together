import React from "react";

export interface PublicLayoutProps {}

function PublicLayout({ ...rest }: PublicLayoutProps) {
  return <div {...rest}>PublicLayout</div>;
}

export { PublicLayout };
