import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [loading,setLoading] = useState(true);
    const [socket,setSocket] = useState<WebSocket>();

    useEffect(() => {
         const ws = new WebSocket(
           `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5YjdhNzdlZS02OWE0LTQ2NjItOGQ5Yy00YzIzNjdkZTE5OTgiLCJpYXQiOjE3NTU2OTI5OTZ9.6wujHVpPVNJvbVoX-4Q71sido7pxwmCH-D6XOTtRgu4`
         );
         ws.onopen = () =>{
            setLoading(false);
            setSocket(ws)
         }
    },[])

    return {
        socket,
        loading
    }
}