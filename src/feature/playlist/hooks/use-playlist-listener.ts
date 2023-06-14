import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimePostgresChangesFilter,
} from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { Channel, supabase } from "~/feature/common";
import {
  GetPlayedPlaylistResponseSuccess,
  GetPlaylistResponseSuccess,
  endPlaylist,
  getPlaylist,
  listenToMusic,
} from "..";
import { getPlayedPlaylist } from "..";
import { GetRoomByIdResponseSuccess } from "~/feature/room/services";
import { GetUserByIdResponseSuccess } from "~/feature/auth";

export interface usePlaylistListenerProps {
  room?: GetRoomByIdResponseSuccess;
  user?: GetUserByIdResponseSuccess;
}
/**
 * This function sets up a real-time subscription to changes in a media playlist for a specific room
 * and updates the state accordingly.
 * @returns null.
 */
function usePlaylistListener({ room, user }: usePlaylistListenerProps) {
  const channelRef = useRef<RealtimeChannel>();
  const [loading, setLoading] = useState(true);
  const [fullAccess, setFullAccess] = useState(false);

  const [currentPlaying, setCurrentPlaying] =
    useState<GetPlayedPlaylistResponseSuccess>();
  const [playlists, setPlaylists] = useState<GetPlaylistResponseSuccess>([]);

  async function handleSubscribe(status: `${REALTIME_SUBSCRIBE_STATES}`) {
    if (status === "SUBSCRIBED") {
      console.log(
        `%c sucess to subscribe media`,
        "background:green;color:white;padding:4px;"
      );
    }
  }

  async function handleLeave() {}

  useEffect(
    function initialAccess() {
      if (!room?.owner || !user?.id) return;
      setFullAccess(room?.owner.id === user?.id);
    },
    [user, room]
  );

  useEffect(
    function performRealtimeSubscribe() {
      if (!room?.id) return;

      async function callGetPlayedPlaylist() {
        const { data, error } = await getPlayedPlaylist({ room_id: room!.id });
        if (error) {
          throw new Error(error.message);
        }

        setCurrentPlaying(data);
      }

      callGetPlayedPlaylist();

      async function callGetPlaylist() {
        const { data, error } = await getPlaylist({ page: 1, per_page: 8 });
        if (error) {
          throw new Error(error.message);
        }
        setPlaylists(data);
      }

      callGetPlaylist();

      setLoading(false);

      const postgresChangesFilter = {
        event: "UPDATE",
        schema: "public",
        table: "media",
        filter: `room_id=eq.${room.id}`,
      } as RealtimePostgresChangesFilter<"UPDATE">;

      channelRef.current = supabase.channel(Channel.ROOM_PLAYLIST + room.id);

      const channel = channelRef.current;

      function handlePostgresChange(payload: any) {
        const updatedCurrentPlaying =
          payload.new as GetPlayedPlaylistResponseSuccess;
        setCurrentPlaying(updatedCurrentPlaying);
      }

      channel.on(
        "postgres_changes",
        postgresChangesFilter,
        handlePostgresChange
      );

      channel.on(
        "presence",
        {
          event: "leave",
        },
        handleLeave
      );

      channel.subscribe(handleSubscribe);

      return () => {
        channel.untrack();
        channel.unsubscribe();
      };
    },
    [room]
  );

  return {
    loading,
    playlists,
    currentPlaying,
    fullAccess,
    endPlaylist,
    listenToMusic,
  };
}

export { usePlaylistListener };
