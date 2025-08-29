'use client'
import axios from "axios";
import { useEffect, useState } from "react";

export  function DashboardItems (){
    const [allRooms,setAllRooms] = useState<any>('')
    const getRooms = async() => {
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
          return rooms.data.rooms
        } catch (e) {
          console.log(e);
        }
    }

    useEffect(() => {
        const data = getRooms();
        if(data) setAllRooms(data);
    },[])

    return <div>
        {
            JSON.stringify(allRooms)
        }
    </div>
}
