import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { userProfilesState } from "../feature/auth/state";
import { Profile } from "~/service/supabase";

export type RouteGuardRole = "public" | "nonUser" | "user";

export interface RouteGuardProps {
  children: ReactNode;
  role?: RouteGuardRole;
  redirect?: string;
}
export type RouteGuardRoleFuncMap = (user: Profile | null) => boolean;

function RouteGuard({
  children,
  role = "user",
  redirect = "/",
}: RouteGuardProps) {
  const { contents: user } = useRecoilValueLoadable(userProfilesState);

  const conditionOfRole: Record<RouteGuardRole, RouteGuardRoleFuncMap> = {
    nonUser: (user: Profile | null) => Boolean(!user),
    user: (user: Profile | null) => Boolean(user),
    public: (user: Profile | null) => true,
  };

  if (!conditionOfRole[role](user)) {
    return <Navigate to={redirect} />;
  }

  return <div>{children}</div>;
}

export { RouteGuard };
