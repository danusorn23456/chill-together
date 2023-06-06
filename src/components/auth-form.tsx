import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useSupabase } from "context";

export interface AuthFormProps {}

export function AuthForm({}: AuthFormProps) {
  const supabase = useSupabase();

  return (
    <div className="card w-full">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
        providers={["google"]}
      />
    </div>
  );
}
