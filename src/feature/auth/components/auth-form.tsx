import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "~/feature/common";

export interface AuthFormProps {}

export function AuthForm({}: AuthFormProps) {
  return (
    <div className="card bg-white w-full">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: { color: "gray" },
          },
        }}
        providers={["google"]}
      />
    </div>
  );
}
