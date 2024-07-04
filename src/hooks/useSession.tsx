import { RealtimeChannel, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaClient } from "../config/supa-client";

export interface UserProfile {
  username: string;
  avatarUrl?: string;
}

export interface UserInfo {
  session: Session | null;
  profile: UserProfile | null;
}

export function useSession(): UserInfo {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    profile: null,
    session: null,
  });

  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    supaClient.auth.getSession().then(({ data: { session } }) => {
      setUserInfo({ ...userInfo, session });
      supaClient.auth.onAuthStateChange((_event, session) => {
        setUserInfo({ session, profile: null });
      });
    });
  }, []);

  useEffect(() => {
    if (userInfo.session?.user && !userInfo.profile) {
      listenToUserProfileChanges(userInfo.session.user.id).then(
        (newChannel) => {
          if (newChannel) {
            if (channel) {
              channel.unsubscribe();
            }
            setChannel(newChannel);
          }
        }
      );
    } else if (!userInfo.session?.user) {
      channel?.unsubscribe();
      setChannel(null);
    }

    return () => {
      channel?.unsubscribe();
      setChannel(null);
    };
  }, [userInfo.session]);

  async function listenToUserProfileChanges(userId: string) {
    const { data } = await supaClient
      .from("user_profiles")
      .select("*")
      .filter("user_id", "eq", userId);

    setUserInfo({ ...userInfo, profile: data?.[0] });
    return supaClient
      .channel(`public:user_profiles`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "user_profiles",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setUserInfo({ ...userInfo, profile: payload.new as UserProfile });
        }
      )
      .subscribe();
  }

  return userInfo;
}
