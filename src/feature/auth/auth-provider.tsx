import { ReactNode, useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { userIDState, userProfilesState } from "./state";
import { supabase } from "~/service/supabase";
import { Navigate } from "react-router-dom";
import { RoutePath } from "~/routes/type";

export interface AuthProviderProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProviderProps) {
  const { state, contents: user } = useRecoilValueLoadable(userProfilesState);
  const setUserId = useSetRecoilState(userIDState);

  useEffect(function wacthAuthState() {
    supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user.id;
      userId && setUserId(session?.user.id);
      if (event === "SIGNED_OUT") {
        setUserId(null);
      }
    });
  }, []);

  if (state !== "loading" && !user) {
    return <Navigate to={RoutePath.SIGNIN} />;
  }

  return <>{children}</>;
}

export { AuthProvider };
