import { ReactNode } from "react";
import { supabase } from "~/service/supabase";

export interface UserLayoutProps {
  children: ReactNode;
}

function UserLayout({ children }: UserLayoutProps) {
  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  return (
    <div className="h-screen">
      <button onClick={handleSignOut}>logout</button>
      {children}
    </div>
  );
}

export { UserLayout };
