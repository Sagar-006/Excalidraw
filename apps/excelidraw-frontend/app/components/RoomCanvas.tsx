'use client'

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export  function RoomCanvas({roomId}:{roomId:string}) {
  const [socket,setSocket] = useState<WebSocket | null>(null)
    // const roomId = roomId;

    useEffect(() => {
      const token = localStorage.getItem('token');
      console.log(token)
      const ws = new WebSocket(
        `${WS_URL}?token=${token}`
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