import { NextApiRequest, NextApiResponse } from "next";
import redis from "@/redis";
import { Message } from "@/typings";

type report = {
  body: string;
  success: boolean;
};
type Data = {
  messages: Message[];
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<report | Data>
) {
  if (req.method !== "GET") {
    return res.status(404).json({ success: false, body: "Method Not Allowed" });
  }
  try {
    const messageRes = await redis.hvals("messages");

    const messages: Message[] = messageRes
      .map((message) => JSON.parse(message))
      .sort((a, b) => b.created_at - a.created_at);
    res.status(200).json({ messages });
  } catch (err) {
    console.log(err);
  }
}
