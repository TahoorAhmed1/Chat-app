import ChatInput from "@/components/ChatInput";
import MessageList from "@/components/MessageList";
import Provider from "@/components/Provider";
import { Message } from "@/typings";
import { getServerSession } from "next-auth";
async function Home() {
  const data = await fetch("http://localhost:3000/api/getMessages").then(
    (res) => res.json()
  );
  const message: Message[] = data.messages;

  const session = await getServerSession();
  return (
    <Provider session={session}>
      <main>
        <MessageList session={session} initialMessage={message}></MessageList>
        <ChatInput session={session}></ChatInput>
      </main>
    </Provider>
  );
}

export default Home;
