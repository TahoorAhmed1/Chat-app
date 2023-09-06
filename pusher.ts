import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "1641636",
  key: "fdf75c09b059bf8eaebc",
  secret: "51b0a5185ad25e16af7f",
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("fdf75c09b059bf8eaebc", {
  cluster: "ap2",
  forceTLS: true,
});
