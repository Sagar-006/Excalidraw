'use client'

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export  function RoomCanvas({roomId}:{roomId:string}) {
  const [socket,setSocket] = useState<WebSocket | null>(null)
    // const roomId = roomId;

    useEffect(() => {
      const ws = new WebSocket(
        `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MTE3NzYxNS1lNzAyLTRiMDYtODgzOS02YzU3NmVkNTRmMjgiLCJpYXQiOjE3NTU4ODM3MDF9.x6ApkYyd2Kvmqp7viGesHsX34YrXZEQXjLquuDA11g8`
      );

      ws.onopen = () => {
        setSocket(ws)
        ws.send(JSON.stringify({
          type:'join_room',
          roomId
        }))
      }
    },[])

    if(!socket){
      return <div>
        Connecting to server...
      </div>
    }
    
    return <div>
      <Canvas roomId={roomId} socket={socket}/>
    </div>
    
}