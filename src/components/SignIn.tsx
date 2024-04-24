import Link from "next/link";
import Image from "next/image";
import UserAuthFormForm from "@/components/UserAuthForm";

const page = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <Image
          src="/hargunTurban.svg"
          width={100}
          height={100}
          className="w-10 h-10 mx-auto"
          alt="hargthread Logo"
        />
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-md max-w-xs mx-auto">
          By continuing you are setting up a hargthreads account and agree to my
          policies which do not exist so far 😎.
        </p>

        <UserAuthFormForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          New to hargthreads?{" "}
          <Link
            href="/sign-up"
            className="hover:text-zinc-800 text-sm underline-offset-4"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
