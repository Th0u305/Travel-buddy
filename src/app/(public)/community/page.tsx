"use client";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { envVars } from "@/src/config/env";
import useKeyboardSound from "@/src/lib/keyboardSound";
import { useUserStore } from "@/src/store/zustand.store";
import {
  MessageCircle,
  PlusCircle,
  Search,
  SendHorizonal,
  Volume2,
  VolumeOff,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import { useForm } from "@tanstack/react-form";
import { useGetMessageHistory, useGetChatUsers } from "@/src/tanstack/useQuery";
import { useSendMessageMutate } from "@/src/tanstack/useMutation";
import { useUserMessageStore, Message } from "@/src/store/userMesage.store";
import { ChatUsersTs, MessageHistoryTs } from "@/src/types/types";
import { Spinner } from "@/src/components/ui/spinner";
import { createClient } from "@/src/lib/supabase/supabaseClient";
import { useQueryClient } from "@tanstack/react-query";
import { useChatScroll } from "@/src/hooks/use-chat-scroll";
import { useRouter } from "next/navigation";

const MessagePage = () => {
  const router = useRouter();
  const { userData } = useUserStore();
  const [isMute, setIsMute] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("isMute");
    return stored !== null ? (JSON.parse(stored) as boolean) : false;
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<ChatUsersTs | null>(null);
  const { playRandomKeyStrokeSound } = useKeyboardSound();
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const { roomId, setRoomId } = useUserMessageStore();
  const queryClient = useQueryClient();
  const supabase = createClient();

  const { sendMessage } = useSendMessageMutate();
  const { isLoading: isChatUsersLoading, chatUsersRefetch, chatUsers } = useGetChatUsers();

  const { containerRef, scrollToBottom } = useChatScroll();

  // Only fetch history when a user is selected
  const selectedReceiverId = selectedUser?.user?.id ?? "";
  const { data: messages } = useGetMessageHistory(selectedReceiverId,userData?.username_slug || "",);


  useEffect(() => {
    chatUsersRefetch();
    scrollToBottom();
  }, [
    messages,
    selectedReceiverId,
    supabase,
    scrollToBottom,
    chatUsersRefetch,
  ]);

  // Keep a stable ref to selectedReceiverId so the realtime callback always
  // uses the latest value even when the closure was created earlier.
  const selectedReceiverIdRef = useRef(selectedReceiverId);
  useEffect(() => {
    selectedReceiverIdRef.current = selectedReceiverId;
  }, [selectedReceiverId]);

  useEffect(() => {
    if (!roomId) return;

    const channel = supabase
      .channel(`room-${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          if (payload.new) {
            queryClient.setQueryData(
              ["messageHistory", selectedReceiverIdRef.current],
              (oldData: MessageHistoryTs) => {
                if (!oldData) return oldData;
                // Replace optimistic placeholder that matches content+sender,
                // or skip if the real id is already present.
                const exists = oldData.messages?.some(
                  (m: Message) =>
                    m.id === payload.new.id ||
                    // replace the optimistic entry written by onSubmit
                    (m.id?.toString().startsWith("optimistic-") &&
                      m.content === payload.new.content &&
                      m.sender_id === payload.new.sender_id),
                );
                if (exists) {
                  // Swap the optimistic entry for the real one
                  return {
                    ...oldData,
                    messages: oldData?.messages?.map((m: Message) =>
                      m.id?.toString().startsWith("optimistic-") &&
                      m.content === payload.new.content &&
                      m.sender_id === payload.new.sender_id
                        ? (payload.new as unknown as Message)
                        : m,
                    ),
                  };
                }
                return {
                  ...oldData,
                  messages: [...(oldData?.messages ?? []), payload?.new],
                };
              },
            );
            scrollToBottom();
          }
        },
      )
      .subscribe();

    // When the tab becomes visible again after being idle the realtime
    // websocket may have missed events. Re-fetch to stay in sync.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        queryClient.invalidateQueries({
          queryKey: ["messageHistory", selectedReceiverIdRef.current],
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      supabase.removeChannel(channel);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [roomId, queryClient, supabase, scrollToBottom]);



  const form = useForm({
    defaultValues: {
      message: "",
    },
    onSubmit: async ({ value }) => {
      if (!selectedUser || !value.message.trim()) return;

      // Optimistic update — add the message to the cache immediately so it
      // appears on the UI without waiting for the server round-trip or the
      // Supabase realtime event (which can take 3-4 s).
      const optimisticId = `optimistic-${crypto.randomUUID()}`;
      queryClient.setQueryData(
        ["messageHistory", selectedReceiverId],
        (oldData: MessageHistoryTs) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            messages: [
              ...(oldData.messages ?? []),
              {
                id: optimisticId,
                room_id: roomId ?? "",
                sender_id: userData?.id ?? "",
                receiver_id: selectedUser.user.id,
                content: value.message,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
            ],
          };
        },
      );
      scrollToBottom();

      sendMessage({
        receiver_id: selectedUser.user.id,
        content: value.message,
        userName_slug: selectedUser.user.username_slug || "",
      });
      form.reset();
    },
  });



  const toggleMute = () => {
    const newState = !isMute;
    setIsMute(newState);
    localStorage.setItem("isMute", JSON.stringify(newState));
    const audio = new Audio("/sound/mouse-click.mp3");
    audio.play().catch((e) => console.log("Audio play failed:", e));
  };

  const handleSelectUser = (chatUser: ChatUsersTs) => {
    setRoomId(chatUser.room_id);
    setSelectedUser(chatUser);
    setIsMobileChatOpen(true);
  };

  const filteredChatUsers = chatUsers?.filter((u:ChatUsersTs) =>
    u?.user?.full_name?.toLowerCase()?.includes(searchQuery.toLowerCase()),
  );

  return (
    <main className="mt-20 flex-1 flex overflow-hidden w-full mx-auto">
      {/* ── Left sidebar ── */}
      <div className={`flex flex-col border-r z-10 ${isMobileChatOpen ? "hidden md:flex md:w-80" : "w-full md:w-80"}`}>
        {/* User header */}
        <div className="flex justify-between items-center p-6">
          <div className="relative flex gap-2">
            <Image
              src={
                userData?.avatar_url ||
                `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776234313/ughr5xdhrc1x7yvgj2va.png`
              }
              alt={userData?.full_name || ""}
              width={100}
              height={100}
              className="w-10 h-10 rounded-full"
            />
            <div className="absolute bg-green-500 rounded-full w-3 h-3 left-7 bottom-8" />
            <div className="flex flex-col">
              <p>{userData?.full_name}</p>
              <p className="text-sm text-primary font-medium">Online</p>
            </div>
          </div>
          {isMute ? (
            <VolumeOff
              className="w-6 h-6 cursor-pointer"
              onClick={toggleMute}
            />
          ) : (
            <Volume2 className="w-6 h-6 cursor-pointer" onClick={toggleMute} />
          )}
        </div>

        {/* Search */}
        <div className="px-6 pb-4">
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">
            Messages
          </h2>
          <div className="flex gap-2 justify-center items-center rounded-full p-2 bg-[#dee3dc]">
            <Search className="w-4 h-4 shrink-0 text-on-surface-variant" />
            <Input
              placeholder="Search conversations..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-auto text-sm"
            />
          </div>
        </div>

        {/* Chat user list */}
        <div className="flex-1 overflow-y-auto px-3 pb-4 space-y-1">
          {isChatUsersLoading || chatUsers.length === 0 ? (
            /* Loading skeletons */
            <div className="w-fit mx-auto mt-10">
              <Spinner className="text-primary w-8 h-8" />
            </div>
          ) : filteredChatUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-on-surface-variant">
              <MessageCircle className="w-8 h-8 opacity-40" />
              <p className="text-sm font-body">No conversations yet</p>
            </div>
          ) : (
            filteredChatUsers?.map((chatUser:ChatUsersTs) => {
              const isSelected = selectedUser?.user?.id === chatUser.user?.id;
              return (
                <button
                  key={chatUser.room_id}
                  onClick={() => handleSelectUser(chatUser)}
                  className={`w-full flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all text-left
                    ${
                      isSelected
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-surface-container"
                    }`}
                >
                  <div className="relative shrink-0">
                    <Image
                      src={
                        chatUser.user?.avatar_url ||
                        `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776234313/ughr5xdhrc1x7yvgj2va.png`
                      }
                      alt={chatUser.user?.full_name || ""}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {isSelected && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-headline font-semibold text-sm truncate ${
                        isSelected ? "text-primary" : "text-on-surface"
                      }`}
                    >
                      {chatUser.user?.full_name || "Unknown User"}
                    </h3>
                    <p className="text-xs text-on-surface-variant font-body truncate w-1/2">
                      {chatUser.user?.bio || "Tap to start chatting"}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── Middle: chat area ── */}
      <section className={`flex-1 flex-col bg-surface h-[90vh] ${!isMobileChatOpen ? "hidden md:flex" : "flex"}`}>
        {selectedUser ? (
          <>
            {/* Chat header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-surface-dim/20 shrink-0">
              <button 
                className="md:hidden mr-1" 
                onClick={(e) => { e.stopPropagation(); setIsMobileChatOpen(false); }}
              >
                <ArrowLeft className="w-6 h-6 text-on-surface" />
              </button>
              <div onClick={()=> router.push(`/profile/${selectedUser.user?.username_slug}`)} className="flex items-center gap-3 cursor-pointer">
                <Image
                  loading="eager"
                  src={
                    selectedUser.user?.avatar_url ||
                    `https://res.cloudinary.com/${envVars.NEXT_PUBLIC_IMAGE_CLOUD_NAME}/image/upload/q_auto/f_auto/v1776234313/ughr5xdhrc1x7yvgj2va.png`
                  }
                  alt={selectedUser.user?.full_name || ""}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-headline font-bold text-sm text-on-surface">
                    {selectedUser.user?.full_name}
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    {selectedUser.user?.username_slug
                      ? `@${selectedUser.user.username_slug}`
                      : ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={containerRef}
              className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4"
            >
              {messages?.messages?.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center gap-3 text-on-surface-variant">
                  <MessageCircle className="w-10 h-10 opacity-30" />
                  <p className="text-sm font-body">
                    No messages yet. Say hello!
                  </p>
                </div>
              ) : (
                messages?.messages?.map((msg:ChatUsersTs) => {
                  const isMe = msg.sender_id === userData?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      {(msg?.content?.trim()?.length ?? 0) > 0 && (
                        <>
                          <div
                            className={`max-w-[85%] md:max-w-[70%] p-3 rounded-2xl ${
                              isMe
                                ? "bg-primary text-on-primary rounded-br-none text-white"
                                : "bg-secondary text-on-surface rounded-bl-none"
                            }`}
                          >
                            <p className="font-body text-sm wrap-break-words whitespace-pre-wrap">{msg.content}</p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Message input */}
            <div className="p-4 md:p-6 border-t border-surface-dim/20 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit();
                }}
                className="rounded-xl flex items-center shadow-md p-2 focus-within:ring-1 focus-within:ring-primary/20"
              >
                <Button variant="ghost" size="icon" type="button">
                  <PlusCircle />
                </Button>
                <form.Field name="message">
                  {(field) => (
                    <Textarea
                      className="focus-visible:border-none focus-visible:ring-none focus-visible:ring-0 flex-1 border-none resize-none py-3 px-2 text-sm font-body text-on-surface placeholder:text-on-surface-variant/70 min-w-0"
                      placeholder="Type a message..."
                      cols={2}
                      rows={2}
                      value={field.state.value}
                      onChange={(e) => {
                        field.handleChange(e.target.value);
                        if (!isMute) {
                          playRandomKeyStrokeSound();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          form.handleSubmit();
                        }
                      }}
                    />
                  )}
                </form.Field>
                <Button size="lg" className="w-12 h-12" variant="default" type="submit">
                  <SendHorizonal />
                </Button>
              </form>
            </div>
          </>
        ) : (
          /* Empty state — no user selected */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-on-surface-variant">
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-primary/40" />
            </div>
            <div className="text-center">
              <h3 className="font-headline font-bold text-lg text-on-surface mb-1">
                Select a conversation
              </h3>
              <p className="text-sm font-body text-on-surface-variant max-w-xs">
                Choose someone from your message history on the left to start
                chatting.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default MessagePage;
