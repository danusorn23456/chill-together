import { ReactNode, useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { supabase } from "~/feature/common";
import { userIDState, userState } from "../store";

export interface AuthProviderProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProviderProps) {
  const { state } = useRecoilValueLoadable(userState);
  const setUserId = useSetRecoilState(userIDState);

  useEffect(function wacthAuthState() {
    supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user.id;
      if (userId) {
        setUserId(session?.user.id);
      }
      if (event === "INITIAL_SESSION") {
      }
      if (event === "SIGNED_OUT") {
        setUserId(null);
      }
    });
  }, []);

  if (state === "loading") {
    return <></>;
  }

  return <>{children}</>;
}

export { AuthProvider };
