import { createClient } from "@supabase/supabase-js";
import { Database } from "./type";

export const supabase = createClient<Database, "public", any>(
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
