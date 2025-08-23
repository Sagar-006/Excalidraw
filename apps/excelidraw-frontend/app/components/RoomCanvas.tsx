'use client'

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export  function RoomCanvas({roomId}:{roomId:string}) {
  const [socket,setSocket] = useState<WebSocket | null>(null)
    // const roomId = roomId;

    useEffect(() => {
      const ws = new WebSocket(
        `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiNzRmZjU0OC1lNWFkLTQ3MTktYmU1NS02NDM3ZDFhMzJjMjMiLCJpYXQiOjE3NTU5NjE0MTl9.3b9CFTrhPQjmKhzXSbAnkuZOuWhBez3DbdKEOV0jpb4`
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