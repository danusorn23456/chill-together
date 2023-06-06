import { SupabaseClient, User, createClient } from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Database } from "../types/supabase";

export type SupabaseContextType = SupabaseClient<any, "public", any>;
export type UserContextType = { user: User | null; isLoading: Boolean | null };

const supabase = createClient<Database, "public", any>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    realtime: {
      params: {
        eventsPerSecond: 2,
      },
    },
  }
);

const SupabaseContext = createContext(supabase);

const UserContext = createContext({} as UserContextType);

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("can't useSupanase outside SupabaeContext");
  }
  return context;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("can't useUser outside SupabaeContext");
  }
  return context;
};

export default function SupabaseContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<Boolean | null>(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    setIsLoading(true);
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (user) {
      setUser(user);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user;
      if (event === "SIGNED_IN") {
        supabase.from("profiles").upsert({
          username: user!.email?.split("@")[0],
          email: user!.email,
          avatar_url: "",
        });
        window.location.reload();
      }
      if (event === "SIGNED_OUT") {
        window.location.reload();
      }
    });
  }, []);

  return (
    <SupabaseContext.Provider value={supabase}>
      <UserContext.Provider value={{ user, isLoading }}>
        {children}
      </UserContext.Provider>
    </SupabaseContext.Provider>
  );
}
