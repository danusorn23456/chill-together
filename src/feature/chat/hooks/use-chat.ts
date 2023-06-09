import { GetMessagesResult, getMessages } from "../services";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { v4 } from "uuid";
import { userRecordState } from "~/feature/auth/store";
import { roomState } from "~/feature/room/store";
import { supabase } from "~/service/supabase";

function useChat() {
  const [messages, setMessages] = useState<GetMessagesResult>([]);

  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userRecordState);

  async function sendMessage(message: string) {
    const { error } = await supabase.from("messages").insert({
      id: v4(),
      room_id: room!.id,
      created_by: user!.id,
      message: message,
    });
    console.log(
      `%c ${error ? "failed" : "success"} to send message`,
      "background:green;color:white;padding:4px;"
    );
  }

  function handlePostgresChange(payload: any) {
    setMessages((prev) => [
      ...prev,
      {
        ...payload.new,
        owner: user,
      },
    ]);
  }

  useEffect(
    function intialMessages() {
      if (!room?.id) return;
      async function callAPIgetMessages() {
        const messages = await getMessages();
        setMessages((prev) => [...messages, ...prev]);
      }
      callAPIgetMessages();
    },
    [room]
  );

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
        console.log(
          `%c sucess to subscribe chat`,
          "background:green;color:white;padding:4px;"
        );
      }
    });
    return () => {
      channel.unsubscribe();
    };
  }, [room, user]);

  return { messages, sendMessage };
}

export { useChat };
