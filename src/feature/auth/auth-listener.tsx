import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userIDState } from "./state";
import { supabase } from "~/service/supabase";

export interface AuthListenerProviderProps {}

function AuthListener({}: AuthListenerProviderProps) {
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

  return null;
}

export { AuthListener };
