"use client";
import { useChatStore } from "@/store/chatStore";
import { Message } from "@/typings";
import { FormEvent } from "react";
import { v4 as uuid } from "uuid";
import useSWR from "swr";
import { fetchMessages } from "@/lib/Chats/fetchMessages";
import { getServerSession } from "next-auth";
type Props = {
  session: Awaited<ReturnType<typeof getServerSession>>;
};
function ChatInput({ session }: Props) {
  const [inputValue, setInputValue, clearInput] = useChatStore((state) => [
    state.inputValue,
    state.setInputValue,
    state.clearInput,
  ]);

  const {
    data: messages,
    error,
    mutate,
  } = useSWR("/api/getMessages", fetchMessages);

  const addMessageHandeler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    const id = uuid();
    const messageData: Message = {
      id,
      message: inputValue,
      created_at: Date.now(),
      username: "Tahoor Ahmed",
      profilePic: `https://tse3.mm.bing.net/th?id=OIP.Cf3rSUAqoBhMkJ-HTHq2aAHaLH&pid=Api&P=0&w=300&h=300`,
      email: "ahmedtahoor5@gmail.com",
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          messageData,
        }),
      }).then((res) => res.json());
      clearInput();
      return [data.message, ...messages!];
    };
    await mutate(uploadMessageToUpstash, {
      optimisticData: [messageData, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      onSubmit={addMessageHandeler}
      className=" fixed bottom-0 w-full flex px-10 py-5 space-x-2 border-t border-gray-100 bg-white"
    >
      <input
        required
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Enter message here..."
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <button
        disabled={!inputValue}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded disabled:cursor-not-allowed disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
