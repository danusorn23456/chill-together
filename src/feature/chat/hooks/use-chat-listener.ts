import { useEffect } from "react";
import { supabase } from "~/feature/common";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "~/feature/auth";
import { roomState } from "~/feature/room";
import { messagesState } from "../store";
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimePostgresChangesFilter,
} from "@supabase/supabase-js";

function useChatListener() {
  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userState);
  const [, setMessages] = useRecoilState(messagesState);

  function handlePostgresChange(payload: any) {
    setMessages((prev) => [
      ...prev,
      {
        ...payload.new,
        owner: user,
      },
    ]);
  }

  async function handleSubscribe(status: `${REALTIME_SUBSCRIBE_STATES}`) {
    if (status === "SUBSCRIBED") {
      console.log(
        `%c sucess to subscribe chat`,
        "background:green;color:white;padding:4px;"
      );
    }
  }

  useEffect(
    function performRealtimeSubscribe() {
      if (!room?.id) {
        return;
      }

      const postgresChangesFilter = {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${room.id}`,
      } as RealtimePostgresChangesFilter<"INSERT">;

      const channel = supabase.channel("db-messages-" + room.id);

      channel.on(
        "postgres_changes",
        postgresChangesFilter,
        handlePostgresChange
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

export { useChatListener };
