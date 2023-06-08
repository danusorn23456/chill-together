import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userRecordState } from "../feature/auth/state";
import { UserRecord } from "~/service/supabase";

export type RouteGuardRole = "public" | "nonUser" | "user";

export interface RouteGuardProps {
  children: ReactNode;
  role?: RouteGuardRole;
  redirect?: string;
}
export type RouteGuardRoleFuncMap = (user: UserRecord | null) => boolean;

function RouteGuard({
  children,
  role = "user",
  redirect = "/",
}: RouteGuardProps) {
  const user = useRecoilValue(userRecordState);

  const conditionOfRole: Record<RouteGuardRole, RouteGuardRoleFuncMap> = {
    nonUser: (user: UserRecord | null) => Boolean(!user),
    user: (user: UserRecord | null) => Boolean(user),
    public: () => true,
  };

  if (!conditionOfRole[role](user)) {
    console.log("USER BEFORE NAVIGATE ", user);
    return <Navigate to={redirect} />;
  }

  return <div>{children}</div>;
}

export { RouteGuard };
