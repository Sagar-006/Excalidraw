'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export  function DashboardItems (){
  const router = useRouter();
  const [allRooms, setAllRooms] = useState<any[]>([]);
  const getRooms = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const rooms = await axios.get(`http://localhost:4000/allrooms`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(rooms.data.rooms);
      return rooms.data.rooms;
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(getRooms)

  useEffect(() => {
    async function fetchData() {
      const data = await getRooms();
      if (data) setAllRooms(data);
    }
    fetchData();
  }, []);
  console.log(allRooms)

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="border max-w-max p-6 flex flex-col justify-center items-center gap-y-2">
        <h1 className="text-2xl">This is my all Rooms</h1>
        {allRooms.map((e) => (
          <div className="border-b-2 cursor-pointer" onClick={() => {
            router.push(`/canvas/${e.id}`)
          }} key={e.id}>RoomName: {e.slug}</div>
        ))}
      </div>
    </div>
  );
}
