import { ReactNode } from "react";
import { useSupabase } from "../context/supabase";

export interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children, ...rest }: MainLayoutProps) {
  const supabae = useSupabase();

  async function handleSignOut() {
    await supabae.auth.signOut();
  }

  return (
    <div {...rest}>
      <button onClick={handleSignOut}>logout</button>
      {children}
    </div>
  );
}

export { MainLayout };
