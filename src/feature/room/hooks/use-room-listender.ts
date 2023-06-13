import { useEffect, useRef } from "react";
import { supabase } from "~/feature/common";
import { Channel } from "../type";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { usersInRoomState } from "../store/users-in-room";
import { roomState, UsersInRoom } from "../store";
import { GetUserByIdResponseSuccess, userState } from "~/feature/auth";
import { useRoomId } from ".";
import { randomBetween } from "~/feature/common/utils";
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimePresenceJoinPayload,
  RealtimePresenceLeavePayload,
} from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "~/routes/type";
import { getRoomById } from "../services";

/**
 * The `useRoomListener` function sets up a real-time subscription to a Supabase channel for online
 * users in a specific room and handles various events related to user presence in the room.
 * @returns An object with a `leaveRoom` function.
 */
function useRoomListener() {
  const room_id = useRoomId();
  const user = useRecoilValue(userState);
  const [room, setRoom] = useRecoilState(roomState);
  const setUsersInRoom = useSetRecoilState(usersInRoomState);
  const navigate = useNavigate();
  const usersChannel = useRef<RealtimeChannel>();

  function leaveRoom() {
    navigate(RoutePath.LOBBY);
  }

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

  function handleJoin({
    newPresences,
  }: RealtimePresenceJoinPayload<{
    [key: string]: GetUserByIdResponseSuccess;
  }>) {
    const user = newPresences[0];
    console.log(
      `%c ${user.username} in the room`,
      "background:royalblue;color:white;padding:4px;"
    );
  }

  function handleLeave({
    leftPresences,
  }: RealtimePresenceLeavePayload<{
    [key: string]: GetUserByIdResponseSuccess;
  }>) {
    const user = leftPresences[0];
    console.log(
      `%c ${user.username} left the room`,
      "background:royalblue;color:white;padding:4px;"
    );
  }

  async function handleSubScribe(status: `${REALTIME_SUBSCRIBE_STATES}`) {
    const channel = usersChannel.current;

    if (status === "SUBSCRIBED") {
      const generateXPosition = randomBetween(3, -3);
      const generateYPosition = randomBetween(-1, -2);

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
      if (!room_id) return;
      async function doAsync() {
        const { data, error } = await getRoomById(room_id);
        if (error) throw new Error(error.message);
        setRoom(data);
      }
      doAsync();
    },
    [room_id]
  );

  useEffect(
    function performRealtimeSubscribe() {
      if (!room) return;

      usersChannel.current = supabase.channel(Channel.ONLINE_USERS + room_id);

      const channel = usersChannel.current;

      channel.on("presence", { event: "sync" }, handleSync);

      channel.on("presence", { event: "join" }, handleJoin);

      channel.on("presence", { event: "leave" }, handleLeave);

      channel.subscribe(handleSubScribe);

      return () => {
        channel.unsubscribe();
      };
    },
    [room]
  );

  return { leaveRoom };
}

export { useRoomListener };
