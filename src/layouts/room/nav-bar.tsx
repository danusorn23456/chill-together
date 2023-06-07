import React from "react";
import { supabase } from "~/service/supabase";

export interface NavBarProps {}

function NavBar({}: NavBarProps) {
  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="screen-space bg-zinc-950">
      <div className="py-6"></div>
    </div>
  );
}

export { NavBar };
