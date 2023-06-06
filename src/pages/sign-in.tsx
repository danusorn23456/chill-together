import { AuthForm } from "~/components";

export interface SignInProps {}

function SignIn({}: SignInProps) {
  return (
    <div className="absolute-center w-full sm:max-w-sm h-full md:h-auto flex items-center screen-space">
      <AuthForm />
    </div>
  );
}

export { SignIn };
