import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimePostgresChangesFilter,
} from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { supabase } from "~/feature/common";
import { roomState } from "~/feature/room";
import { Channel } from "~/feature/room";
import { GetPlayedPlaylistResponseSuccess, musicState } from "..";
import { getPlayedPlaylist } from "..";

/**
 * This function sets up a real-time subscription to changes in a media playlist for a specific room
 * and updates the state accordingly.
 * @returns null.
 */
function useMediaListener() {
  const room = useRecoilValue(roomState);
  const channelRef = useRef<RealtimeChannel>();
  const setMusic = useSetRecoilState(musicState);

  function handlePostgresChange(payload: any) {
    const updatedMusic = payload.new as GetPlayedPlaylistResponseSuccess;
    setMusic(updatedMusic);
  }

  async function handleSubscribe(status: `${REALTIME_SUBSCRIBE_STATES}`) {
    if (status === "SUBSCRIBED") {
      console.log(
        `%c sucess to subscribe media`,
        "background:green;color:white;padding:4px;"
      );
    }
  }

  async function handleLeave() {
    setMusic(null);
  }

  useEffect(() => {
    if (!room) return;
    async function doAsync() {
      const { data, error } = await getPlayedPlaylist({ room_id: room!.id });
      if (error) {
        throw new Error(error.message);
      }
      setMusic(data);
    }
    doAsync();
  }, [room]);

  useEffect(
    function performRealtimeSubscribe() {
      if (!room) return;

      const postgresChangesFilter = {
        event: "UPDATE",
        schema: "public",
        table: "media",
        filter: `room_id=eq.${room.id}`,
      } as RealtimePostgresChangesFilter<"UPDATE">;

      channelRef.current = supabase.channel(Channel.ROOM_MEDIA + room.id);

      const channel = channelRef.current;

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

  return null;
}

export { useMediaListener };
