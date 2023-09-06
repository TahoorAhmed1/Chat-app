"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default LogoutButton;
