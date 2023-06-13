import { AuthForm } from "~/feature/auth";

/**
 * baisc sign page with AithForm
 */

function SignIn() {
  return (
    <div className="absolute-center w-full sm:max-w-sm h-full md:h-auto flex items-center screen-space">
      <AuthForm />
    </div>
  );
}

export { SignIn };
