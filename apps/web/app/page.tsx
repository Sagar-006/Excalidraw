'use client'
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [roomId,setRoomId] = useState("")
  const router = useRouter();
  console.log(roomId)
  return (
    <div style={{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      height:'100vh',
      width:'100vw'
    }}>
      <input type="text" value={roomId} onChange={(e) => {
        setRoomId(e.target.value);
      }} placeholder="room id" >
      </input>
      <button  onClick={() => {
        router.push(`/room/${roomId}`)
      }}>Join room</button>
    </div>
  );
}
