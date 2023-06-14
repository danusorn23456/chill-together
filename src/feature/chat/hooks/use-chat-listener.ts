import { useEffect, useRef, useState } from "react";
import { Channel, supabase } from "~/feature/common";
import { OnlineUsers } from "~/feature/room";
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimePostgresChangesFilter,
} from "@supabase/supabase-js";
import {
  GetMessagesByRoomIdResponseSuccess,
  getMessagesByRoomId,
  sendMessage as sendMessageAPI,
} from "..";
import { GetUserByIdResponseSuccess } from "~/feature/auth";
import { GetRoomByIdResponseSuccess } from "~/feature/room/services";

/**
 * The `useChatListener` function sets up a real-time chat listener using Supabase to listen for
 * changes in a chat room and update the messages accordingly.
 * @returns null is being returned.
 */

export interface UseChatListenerProps {
  room?: GetRoomByIdResponseSuccess;
  user?: GetUserByIdResponseSuccess;
  users?: OnlineUsers;
}

function useChatListener({ room, user, users }: UseChatListenerProps) {
  const [loading, setLoading] = useState(true);
  const chatChannel = useRef<RealtimeChannel>();
  const [messages, setMessages] = useState<GetMessagesByRoomIdResponseSuccess>(
    []
  );

  async function sendMessage(message: string) {
    const { error } = await sendMessageAPI({
      message: message,
      room_id: room!.id,
      sender_id: user!.id,
    });

    if (error) throw new Error(error.message);

    return "success";
  }

  function handlePostgresChange(payload: any) {
    const sender = users!.find((user) => user.id === payload.new.sender_id);
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

  async function handleLeave() {
    setMessages([]);
  }

  useEffect(
    function intialMessages() {
      if (!room?.id) return;
      async function doAsync() {
        const { data, error } = await getMessagesByRoomId(room!.id);
        if (error) throw new Error(error.message);
        setMessages(data);
      }
      doAsync();
      setLoading(false);
    },
    [room]
  );

  useEffect(
    function performRealtimeSubscribe() {
      if (!room?.id || !user?.id) {
        return;
      }

      chatChannel.current = supabase.channel(Channel.ROOM_MESSAGES + room!.id, {
        config: {
          presence: {
            key: user.id,
          },
        },
      });

      const channel = chatChannel.current;

      const postgresChangesFilter = {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${room!.id}`,
      } as RealtimePostgresChangesFilter<"INSERT">;

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
    [room, users]
  );

  return { loading, messages, sendMessage };
}

export { useChatListener };
