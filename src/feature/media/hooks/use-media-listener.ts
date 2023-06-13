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
        channel.unsubscribe();
      };
    },
    [room]
  );

  return null;
}

export { useMediaListener };
