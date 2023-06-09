import { createClient } from "@supabase/supabase-js";
import { Database } from "./type";

export const supabase = createClient<Database, "public">(
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

export enum Channel {
  ROOM_USERS = "room-users-channel-",
  ROOM_MESSAGES = "room-messages-channel-",
  ROOM_PLAYLIST = "room-media-channel-",
}
