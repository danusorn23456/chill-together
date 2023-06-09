import { useEffect } from "react";
import { supabase } from "~/service/supabase";
import { getMessagesByRoomId } from "..";
import { v4 } from "uuid";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { messagesState } from "../store";
import { userRecordState } from "~/feature/auth";
import { roomState } from "~/feature/room/store";

function useChatListener() {
  const setMessages = useSetRecoilState(messagesState);
  const room = useRecoilValue(roomState);
  const user = useRecoilValue(userRecordState);

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
        const messages = await getMessagesByRoomId(room!.id);
        setMessages((prev) => [...messages, ...prev]);
      }
      callAPIgetMessages();
    },
    [room]
  );

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
