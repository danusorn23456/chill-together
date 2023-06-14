import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "~/feature/common";
/**
 * The function returns a component that renders an authentication form using Supabase and Google as a
 * provider.
 * @returns The `AuthForm` component is being returned, which renders a `div` element with a `card`
 * class and a child `Auth` component. The `Auth` component is passed some props including a
 * `supabaseClient` object, an `appearance` object with a `theme` and `style` property, and a
 * `providers` array with a single string value of `"google
 */

export function AuthForm() {
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
        providers={[]}
      />
    </div>
  );
}
