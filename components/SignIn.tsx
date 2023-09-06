"use client";
import { getProviders, signIn } from "next-auth/react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignIn({ providers }: Props) {
  return (
    <div className="flex justify-center">
      {Object.values(providers!).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => {
              signIn(provider.id, {
                callbackUrl: "http://localhost:3000",
              });
            }}
            className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded "
          >
            Sign In with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignIn;
