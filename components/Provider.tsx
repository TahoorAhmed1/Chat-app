"use client";
import { SessionProvider } from "next-auth/react";
function Provider({ session, children }: any) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Provider;
