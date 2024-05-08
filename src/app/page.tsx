import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import GeneralFeed from "@/components/GeneralFeed";
import CustomFeed from "@/components/CustomFeed";

export default async function Home() {

  const session = await getAuthSession()


  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl">hargthread Feed</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
        {/*@ts-expect-error server component*/}
        {session ? <GeneralFeed /> : <GeneralFeed />}

        <div className="overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
          <div className="bg-gray-950 py-4 px-6">
            <p className="text-lg font-semibold py-3 flex items-center gap-1.5 text-white">
              <HomeIcon className="w-5 h-5 text-white" />
              Home
            </p>
          </div>

          <div className="px-6 py-4 leading-6 bg-white">
            <div className="flex justify-between gap-x-4 py-3">
              <p className="text-zinc-900 text-md">
                Your personal hargthreads feed. Come here to check in with cool
                hargthreads 😁
              </p>
            </div>
            <Link
              className={buttonVariants({
                className: "w-full mt-4 mb-6",
              })}
              href="/hargmunity/create"
            >
              Create Hargmunity
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
