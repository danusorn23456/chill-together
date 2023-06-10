import { useEffect } from "react";
import { supabase } from "~/service/supabase";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "~/feature/auth";
import { roomState } from "~/feature/room";
import { messagesState } from "../store";

function useChatListener() {
  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userState);
  const [messages, setMessages] = useRecoilState(messagesState);

  function handlePostgresChange(payload: any) {
    setMessages((prev) => [
      ...prev,
      {
        ...payload.new,
        owner: user,
      },
    ]);
  }

  useEffect(() => {
    if (!room?.id) {
      return;
    }

    const channel = supabase.channel("db-messages-" + room.id);

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
  }, [room]);

  return null;
}

export { useChatListener };
