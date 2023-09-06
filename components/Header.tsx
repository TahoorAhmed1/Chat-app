import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth";

const Header = async () => {
  const session =true
  if (session) {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center shadow-sm p-10">
        <div className="flex space-x-2">
          <Image
            className="rounded-full mx-2 object-contain"
            src={"https://links.papareact.com/jne"}
            width={60}
            height={40}
            alt="Profile Picture"
          ></Image>
          <div>
            <p className="text-blue-400">Logged is as:</p>
            <p className="font-bold">Tahoor Ahmed</p>
          </div>
        </div>
        <LogoutButton></LogoutButton>
      </header>
    );
  }
  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center shadow-sm p-10">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src={"https://links.papareact.com/jne"}
            width={60}
            height={40}
            alt="logo"
          ></Image>
          <p className="text-blue-400">Welcome to Meta Messanger </p>
        </div>
        <Link
          href={"/auth/signin"}
          className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
};
export default Header;
