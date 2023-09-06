import { Message } from "@/typings";
export const fetchMessages = async () => {
  const res = await fetch("/api/getMessages");
  const data = await res.json();
  const messages: Message[] = data.messages;
  return messages;
};
