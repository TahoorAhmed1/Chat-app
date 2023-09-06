import { NextApiRequest, NextApiResponse } from "next";
import redis from "@/redis";
import { Message } from "@/typings";
import { serverPusher } from "@/pusher";

type report = {
  body: string;
  success: boolean;
};
type Data = {
  message: Message;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<report | Data>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ success: false, body: "Method Not Allowed" });
  }
  try {
    const { messageData } = req.body;
    const newMessage = {
      ...messageData,
      created_at: Date.now(),
    };

    await redis.hset("messages", messageData.id, JSON.stringify(newMessage));
    serverPusher.trigger("messages", "new-message", newMessage);
    res.status(200).json({ message: newMessage });
  } catch (err) {
    console.log(err);
  }
}
