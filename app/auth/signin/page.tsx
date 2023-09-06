import SignIn from "@/components/SignIn";
import { getProviders } from "next-auth/react";
import Image from "next/image";

async function signInpage() {
  const providers = await getProviders();
  return (
    <div className="grid justify-center">
      <div>
        <Image
          className="rounded-full"
          src={"https://links.papareact.com/161"}
          width={700}
          height={700}
          alt="Profile Picture"
        ></Image>
      </div>
      <SignIn providers={providers}></SignIn>
    </div>
  );
}

export default signInpage;
