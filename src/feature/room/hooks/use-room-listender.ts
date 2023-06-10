import { useEffect, useRef } from "react";
import { User, supabase } from "~/feature/common";
import { Channel } from "../type";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { usersInRoomState } from "../store/users-in-room";
import { roomIdState, roomState, UsersInRoom } from "../store";
import { userState } from "~/feature/auth";
import { useRoomId } from ".";
import { randomBetween } from "~/feature/common/utils";
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimePresenceJoinPayload,
  RealtimePresenceLeavePayload,
} from "@supabase/supabase-js";

function useRoomListener() {
  const room_id = useRoomId();
  const user = useRecoilValue(userState);
  const room = useRecoilValue(roomState);
  const setUsersInRoom = useSetRecoilState(usersInRoomState);
  const setRoomId = useSetRecoilState(roomIdState);

  const usersChannel = useRef<RealtimeChannel>();

  function handleSync() {
    let usersInRoom = Object.values(usersChannel!.current!.presenceState()).map(
      (i) => i[0]
    ) as unknown as UsersInRoom;

    console.log(
      `%c online users ${usersInRoom.length}`,
      "background:royalblue;color:white;padding:4px;"
    );

    usersInRoom = usersInRoom.sort((a, b) => {
      if (a.is_owner && !b.is_owner) {
        return -1; // a should come before b
      } else if (!a.is_owner && b.is_owner) {
        return 1; // a should come after b
      }

      const dateA = new Date(a.online_at);
      const dateB = new Date(b.online_at);

      return dateA.getTime() - dateB.getTime();
    });

    setUsersInRoom(usersInRoom);
  }

  function handleJoin({ newPresences }: RealtimePresenceJoinPayload<User>) {
    const user = newPresences[0];
    console.log(
      `%c ${user.username} in the room`,
      "background:royalblue;color:white;padding:4px;"
    );
  }

  function handleLeave({ leftPresences }: RealtimePresenceLeavePayload<User>) {
    const user = leftPresences[0];
    console.log(
      `%c ${user.username} left the room`,
      "background:royalblue;color:white;padding:4px;"
    );
  }

  async function handleSubScribe(status: `${REALTIME_SUBSCRIBE_STATES}`) {
    const channel = usersChannel.current;

    if (status === "SUBSCRIBED") {
      const generateXPosition = randomBetween(5, -5);
      const generateYPosition = randomBetween(1, -3);

      await channel!.track({
        is_owner: room?.created_by === user!.id,
        id: user!.id,
        username: user!.username,
        avatar_url: user!.avatar_url,
        online_at: new Date().toISOString(),
        coordinates: [generateXPosition, generateYPosition, 0],
      });

      channel!.send({
        type: "boardcast",
        event: "a",
        payload: "awd",
      });

      console.log(
        `%c success to subscribe room`,
        "background:green;color:white;padding:4px;"
      );
    }
  }

  useEffect(
    function performRoomId() {
      if (room_id) {
        setRoomId(room_id);
      }
    },
    [room_id]
  );

  useEffect(
    function performRealtimeSubscribe() {
      if (!user || !room) return;

      usersChannel.current = supabase.channel(Channel.ONLINE_USERS + room_id, {
        config: {
          presence: {
            key: user!.id,
          },
        },
      });

      const channel = usersChannel.current;

      channel.on("presence", { event: "sync" }, handleSync);

      channel.on("presence", { event: "join" }, handleJoin);

      channel.on("presence", { event: "leave" }, handleLeave);

      channel.subscribe(handleSubScribe);

      return () => {
        channel.unsubscribe();
        channel.untrack();
      };
    },
    [room, user]
  );

  return null;
}

export { useRoomListener };
