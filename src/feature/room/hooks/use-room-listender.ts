import { useEffect, useRef, useState } from "react";
import { Channel, supabase } from "~/feature/common";
import { GetUserByIdResponseSuccess } from "~/feature/auth";
import { randomBetween } from "~/feature/common/utils";
import {
  REALTIME_SUBSCRIBE_STATES,
  RealtimeChannel,
  RealtimePresenceJoinPayload,
  RealtimePresenceLeavePayload,
} from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "~/routes/type";
import { GetRoomByIdResponseSuccess, getRoomById } from "../services";
import { sortBy } from "lodash";

export type OnlineUser = GetUserByIdResponseSuccess & {
  coordinates: number[];
  is_owner: boolean;
};

export type OnlineUsers = OnlineUser[];
/**
 * The `useRoomListener` function sets up a real-time subscription to a Supabase channel for online
 * users in a specific room and handles various events related to user presence in the room.
 * @returns An object with a `leaveRoom` function.
 */

export interface UseRoomListenerProps {
  roomId: string;
  user?: GetUserByIdResponseSuccess;
}

function useRoomListener({ roomId, user }: UseRoomListenerProps) {
  const [loading, setLoading] = useState(true);

  const [room, setRoom] = useState<GetRoomByIdResponseSuccess>();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers>();
  const navigate = useNavigate();
  const usersChannel = useRef<RealtimeChannel>();

  function leaveRoom() {
    navigate(RoutePath.LOBBY);
  }

  function handleSync() {
    let usersInRoom = Object.values(usersChannel!.current!.presenceState()).map(
      (i) => i[0]
    ) as unknown as OnlineUsers;

    usersInRoom.map((user) => ({
      ...user,
      is_owner: user.id === room?.owner.id,
    }));

    console.log(
      `%c online users ${usersInRoom.length}`,
      "background:royalblue;color:white;padding:4px;"
    );

    usersInRoom = sortBy(usersInRoom, (user) => {
      if (user.is_owner) {
        return -Infinity;
      }

      return new Date(user.created_at).getTime();
    });

    setOnlineUsers(usersInRoom);
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
      const generateYPosition = randomBetween(-1.5, 0);

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
      if (!roomId) return;
      async function doAsync() {
        const { data, error } = await getRoomById(roomId);
        if (error) throw new Error(error.message);
        setRoom(data);
        setLoading(false);
      }
      doAsync();
    },
    [roomId]
  );

  useEffect(
    function performRealtimeSubscribe() {
      if (!room) return;

      usersChannel.current = supabase.channel(Channel.ROOM_USERS + roomId);

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

  return { loading, room, onlineUsers, leaveRoom };
}

export { useRoomListener };
