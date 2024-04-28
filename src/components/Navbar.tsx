import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-950 border-b border-zinc-100 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link href="/" className="flex gap-2 items-center">
          <Image
            src="/hargunTurban.svg"
            width={100}
            height={100}
            className="w-8 h-8"
            alt="hargthread Logo"
            priority={true}
            sizes="100"
          ></Image>
          <p className="hidden text-zinc-100 text-lg font-bold md:block hover:text-zinc-300">
            hargthreads
          </p>
        </Link>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
