import { useEffect } from "react";
import { useSupabase, useUser } from "../../context/supabase";
export interface ParticipantListsProps {}

function ParticipantLists({ ...rest }: ParticipantListsProps) {
  // Supabase client setup
  const supabase = useSupabase();
  const { user } = useUser();

  useEffect(() => {
    const channel = supabase.channel("participant");

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        const presenceTrackStatus = await channel.track({
          user: user!.email,
          online_at: new Date().toISOString(),
        });
        console.log(presenceTrackStatus);
        console.log("sub");
      }
    });
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return <div {...rest}>ParticipantLists</div>;
}

export { ParticipantLists };
