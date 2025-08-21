import { Button } from "@repo/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div className=" text-black items-center justify-items-center min-h-screen  bg-white sm:p-20">
      <div>
        <h1 className="text-3xl">excelidraw-frontend</h1>
      </div>
      <div className="flex gap-x-10 mt-6">
        <Link href={"/signin"}>
          <Button className="bg-green-400" size="lg" variant="primary">
            SignIn
          </Button>
        </Link>
        <Link href={'/signup'}>
          <Button className="" size="lg" variant="primary">
            SignUp
          </Button>
        </Link>
      </div>
    </div>
  );
}
