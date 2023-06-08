import { APIgetMessagesResult } from "./api-get-messages";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 } from "uuid";
import { supabase } from "~/service/supabase";
import { roomState } from "../room/state";
import { userRecordState } from "../auth/state";

function useChat() {
  const [messages, setMessages] = useState<APIgetMessagesResult>([]);

  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userRecordState);

  function sendMessage(message: string) {
    console.log("message : ", message);
  }

  function handlePostgresChange(payload: any) {
    console.log("MESSAGE PAYLOAD", payload);
    setMessages(payload);
  }

  useEffect(() => {
    if (!room?.id || !user?.id) {
      return;
    }

    const channel = supabase.channel("db-messages");

    channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `room_id=eq.${room.id}`,
      },
      handlePostgresChange
    );

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const res = await supabase.from("messages").insert({
          id: v4(),
          room_id: room.id,
          created_by: user.id,
          message: "Welcome to Realtime!",
        });
        console.log(res);
        console.log("subscribe to chat room");
      }
    });
    return () => {
      channel.unsubscribe();
    };
  }, [room, user]);

  return { messages, sendMessage };
}

export { useChat };
