import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { RoomRecordWithOwner, UserRecord, supabase } from "~/service/supabase";

export interface UseChatProps {
  room: RoomRecordWithOwner;
  user: UserRecord;
}

function useChat({ room, user }: UseChatProps) {
  const [chat, setChat] = useState();

  function handlePostgresChange(payload: any) {
    console.log("MESSAGE PAYLOAD", payload);
    setChat(payload);
  }

  useEffect(() => {
    if (!room.id || !user.id) {
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

  return chat;
}

export { useChat };
