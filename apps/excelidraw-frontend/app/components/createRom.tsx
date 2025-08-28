'use client'

import { Button } from "@repo/ui/button"
import { Input } from "@repo/ui/input"
import { buildRoom } from "../hooks/createRoom"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateRom ()  {
    const navigate = useRouter()
    const [slug, setSlug] = useState("");
    const token = localStorage.getItem('token');
    

    useEffect(() => {
        if (!token) {
          return navigate.replace("/signin");
        }
    })
    return (
      <div className="border-2 border-black">
        <div className="flex w-screen h-screen justify-center items-center text-center gap-2 flex-col border-2 ">
          <Input
            className="w-[300px] border"
            type="text"
            placeholder="room-name"
            onChange={(e) => setSlug(e.target.value)}
          />
          <Button
            className="border px-2 rounded w-max "
            size="default"
            onClick={() => {
              buildRoom({ slug, token });
            }}
          >
            Create-Room
          </Button>
        </div>
      </div>
    );
}