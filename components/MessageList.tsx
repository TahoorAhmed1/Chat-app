"use client";
import useSWR from "swr";
import { fetchMessages } from "@/lib/Chats/fetchMessages";
import { Message } from "@/typings";
import MessageComponent from "./MessageComponent";
import { useEffect } from "react";
import { clientPusher } from "@/pusher";
import { getServerSession } from "next-auth";
type Props = {
  initialMessage: Message[];
  session: Awaited<ReturnType<typeof getServerSession>>;
};
const MessageList = ({ session, initialMessage }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", fetchMessages);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      if (messages?.find((messages) => messages.id === data.id)) return; // this is because we dont want to show message twice in  our page
      if (!messages) {
        mutate(fetchMessages);
      } else {
        mutate(fetchMessages, {
          optimisticData: [data, ...messages!],
          rollbackOnError: true,
        });
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, clientPusher, mutate]);

  return (
    <>
      <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto ">
        {(messages || initialMessage).map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))}
      </div>
    </>
  );
};

export default MessageList;
