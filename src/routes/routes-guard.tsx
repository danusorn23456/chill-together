import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { GetUserByIdResponseSuccess } from "~/feature/auth";
import { userState } from "~/feature/auth/store";

export type RouteGuardRole = "public" | "nonUser" | "user";

export interface RouteGuardProps {
  children: ReactNode;
  role?: RouteGuardRole;
  redirect?: string;
}

export type RouteGuardRoleFuncMap = (
  user: GetUserByIdResponseSuccess
) => boolean;

function RouteGuard({
  children,
  role = "user",
  redirect = "/",
}: RouteGuardProps) {
  const user = useRecoilValue(userState);

  const conditionOfRole: Record<RouteGuardRole, RouteGuardRoleFuncMap> = {
    nonUser: (user: GetUserByIdResponseSuccess) => Boolean(!user),
    user: (user: GetUserByIdResponseSuccess) => Boolean(user),
    public: () => true,
  };

  if (!conditionOfRole[role](user)) {
    return <Navigate to={redirect} />;
  }

  return <>{children}</>;
}

export { RouteGuard };
