import { ReactNode } from "react";
import { useUser } from "../context/supabase";
import { Navigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

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
  const { user, isLoading } = useUser();

  const conditionOfRole: Record<RouteGuardRole, RouteGuardRoleFuncMap> = {
    nonUser: (user: User | null) => Boolean(!user),
    user: (user: User | null) => Boolean(user),
    public: (user: User | null) => true,
  };

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!conditionOfRole[role](user) && !isLoading) {
    return <Navigate to={redirect} />;
  }

  return <div>{children}</div>;
}

export { RouteGuard };
