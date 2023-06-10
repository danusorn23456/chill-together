import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "~/feature/auth/store";
import { User } from "~/feature/common";

export type RouteGuardRole = "public" | "nonUser" | "user";

export interface RouteGuardProps {
  children: ReactNode;
  role?: RouteGuardRole;
  redirect?: string;
}
export type RouteGuardRoleFuncMap = (user: User | null) => boolean;

function RouteGuard({
  children,
  role = "user",
  redirect = "/",
}: RouteGuardProps) {
  const user = useRecoilValue(userState);

  const conditionOfRole: Record<RouteGuardRole, RouteGuardRoleFuncMap> = {
    nonUser: (user: User | null) => Boolean(!user),
    user: (user: User | null) => Boolean(user),
    public: () => true,
  };

  if (!conditionOfRole[role](user)) {
    return <Navigate to={redirect} />;
  }

  return <div>{children}</div>;
}

export { RouteGuard };
