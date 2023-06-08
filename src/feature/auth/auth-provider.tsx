import { ReactNode, useEffect } from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { userIDState, userRecordState } from "./state";
import { supabase } from "~/service/supabase";

export interface AuthProviderProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProviderProps) {
  const { state } = useRecoilValueLoadable(userRecordState);
  const setUserId = useSetRecoilState(userIDState);

  useEffect(function wacthAuthState() {
    supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user.id;
      userId && setUserId(session?.user.id);
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