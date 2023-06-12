import React from "react";

export interface MedaiPlayerProps {}

function MedaiPlayer({ ...rest }: MedaiPlayerProps) {
  return <div {...rest}>MedaiPlayer</div>;
}

export { MedaiPlayer };
