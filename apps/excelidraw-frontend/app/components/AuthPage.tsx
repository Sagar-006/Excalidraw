"use client"
import { Input } from "@repo/ui/input";

export function AuthPage({isSignin}:{
    isSignin:boolean
}){
    return (
      <div className="w-screen h-screen flex justify-center items-center ">
        <div className=" m-2 bg-white rounded flex flex-col gap-y-6 p-10">
          
          <div>
            <Input type="email" placeholder="Email"/>
          </div>
          <div>
            <Input type="password" placeholder="password" />
          </div>
          <button
            className="border min-w-min  bg-gray-900 text-white rounded"
            onClick={() => {}}
          >
            {isSignin ? "signin" : "signup"}
          </button>
        </div>
      </div>
    );
}
