import Link from "next/link";
import Image from "next/image";
import UserAuthFormForm from "@/components/UserAuthForm";

const page = () => {
  return (
    <div className="container mx-auto flex w-[90%] flex-col justify-center space-y-6 sm:w-[400px] rounded-lg bg-white p-12 shadow">
      <div className="flex flex-col space-y-2 text-center">
        <Image
          src="/hargunTurban.svg"
          width={100}
          height={100}
          className="w-10 h-10 mx-auto"
          alt="hargthread Logo"
        />
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-md max-w-xs mx-auto">
          By continuing you are setting up a hargthreads account and agree to my
          policies 😎
        </p>

        <UserAuthFormForm />

        <p className="px-8 text-center text-sm text-zinc-700">
          Already a hargtheader?{" "}
          <span className="block sm:inline">
            <Link
              href="/sign-in"
              className="hover:text-zinc-800 text-sm underline"
            >
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default page;
