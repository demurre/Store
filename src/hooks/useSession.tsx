import { RealtimeChannel, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supaClient } from "../config/supa-client";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  image?: string;
  avatarUrl?: string;
  created_at?: string;
}

export interface UserInfo {
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

export function useSession(): UserInfo {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    profile: null,
    session: null,
    isLoading: true,
    error: null,
    refreshProfile: async () => {},
  });

  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  const refreshProfile = async () => {
    if (!userInfo.session?.user?.id) return;

    try {
      const { data, error } = await supaClient
        .from("profile")
        .select("*")
        .eq("id", userInfo.session.user.id)
        .single();

      if (error) throw error;

      setUserInfo((prev) => ({
        ...prev,
        profile: data as UserProfile,
        isLoading: false,
      }));
    } catch (error) {
      setUserInfo((prev) => ({
        ...prev,
        error: "Failed to refresh profile",
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {
          data: { session },
        } = await supaClient.auth.getSession();
        setUserInfo((prev) => ({ ...prev, session, isLoading: !!session }));

        if (!session) {
          setUserInfo((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setUserInfo((prev) => ({
          ...prev,
          error: "Failed to get session",
          isLoading: false,
        }));
      }
    };

    fetchSession();

    const {
      data: { subscription },
    } = supaClient.auth.onAuthStateChange(async (_event, session) => {
      setUserInfo((prev) => ({
        ...prev,
        session,
        profile: null,
        isLoading: !!session,
      }));

      if (!session) {
        setUserInfo((prev) => ({ ...prev, isLoading: false }));
      }
    });

    return () => subscription.unsubscribe();
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
    try {
      const { data, error } = await supaClient
        .from("profile")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        // If profile doesn't exist, create it
        if (error.code === "PGRST116") {
          const { data: userData } = await supaClient.auth.getUser();

          if (userData?.user) {
            const { data: newProfile, error: createError } = await supaClient
              .from("profile")
              .insert({
                id: userId,
                username:
                  userData.user.email?.split("@")[0] ||
                  `user_${Date.now().toString(36)}`,
                email: userData.user.email,
              })
              .select()
              .single();

            if (!createError && newProfile) {
              setUserInfo((prev) => ({
                ...prev,
                profile: newProfile as UserProfile,
                isLoading: false,
              }));
            } else {
              setUserInfo((prev) => ({
                ...prev,
                error: "Failed to create profile",
                isLoading: false,
              }));
            }
          }
        } else {
          setUserInfo((prev) => ({
            ...prev,
            error: "Failed to fetch profile",
            isLoading: false,
          }));
        }
      } else {
        setUserInfo((prev) => ({
          ...prev,
          profile: data as UserProfile,
          isLoading: false,
        }));
      }
    } catch (error) {
      setUserInfo((prev) => ({
        ...prev,
        error: "Unexpected error occurred",
        isLoading: false,
      }));
    }

    return supaClient
      .channel(`public:profile:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profile",
          filter: `id=eq.${userId}`,
        },
        (payload) => {
          setUserInfo((prev) => ({
            ...prev,
            profile: payload.new as UserProfile,
            isLoading: false,
          }));
        }
      )
      .subscribe();
  }

  return { ...userInfo, refreshProfile };
}
