import { useEffect, useRef } from "react";
import { supabase } from "~/feature/common";
import { useRecoilState, useRecoilValue } from "recoil";
import { roomState, usersInRoomState } from "~/feature/room";
import { messagesState } from "../store";
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimePostgresChangesFilter,
} from "@supabase/supabase-js";
import { Channel } from "~/feature/room/type";

function useChatListener() {
  const room = useRecoilValue(roomState);
  const users = useRecoilValue(usersInRoomState);
  const chatChannel = useRef<RealtimeChannel>();
  const [, setMessages] = useRecoilState(messagesState);

  function handlePostgresChange(payload: any) {
    const sender = users.find((user) => user.id === payload.new.sender_id);
    setMessages((prev) => [
      ...(prev || []),
      {
        ...payload.new,
        sender,
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
      if (!room?.id || !users) {
        return;
      }

      const postgresChangesFilter = {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${room.id}`,
      } as RealtimePostgresChangesFilter<"INSERT">;

      chatChannel.current = supabase.channel(Channel.ROOM_MESSAGES + room.id);

      const channel = chatChannel.current;

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
    [room, users]
  );

  return null;
}

export { useChatListener };
