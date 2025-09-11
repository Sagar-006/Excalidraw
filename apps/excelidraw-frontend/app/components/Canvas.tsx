'use client'
// import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {Circle, Text, Pencil, RectangleHorizontal} from "lucide-react"
import { Game } from "@/draw/Game";
import Link from "next/link";

export type Tool = 'pencil' | 'rect' | 'circle' | 'text';
export function Canvas({
    roomId,
    socket
}:{
    socket:WebSocket;
    roomId:string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game,setGame] = useState<Game>();
  const [selectedTool,setSelectedTool] = useState<Tool>('pencil');

  if(!localStorage.getItem('token')){
    return (
      <Link href={'/signin'}>
        <button>Signin please</button>
      </Link>
    );
  }

  useEffect(() => {
    game?.setTool(selectedTool)
  },[selectedTool])

  useEffect(() => {
    if (canvasRef.current) {
      const g = new Game(canvasRef.current,roomId,socket);
      setGame(g);

      return () => {
        g.destroy();
      };
    }

  }, [canvasRef]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
      
    </div>
  );
}

function TopBar ({selectedTool,setSelectedTool}:{
  selectedTool:Tool,
  setSelectedTool:(s:Tool) => void
}) {
  return (
    <div className=" text-black flex fixed top-5 left-8 p-3 rounded shadow-lg z-50 gap-x-6">
      <div className="flex gap-x-3">
        <IconButton
          activated={selectedTool === "pencil"}
          icon={<Pencil />}
          onClick={() => {
            setSelectedTool("pencil");
          }}
        ></IconButton>
        <IconButton
          activated={selectedTool === "rect"}
          icon={<RectangleHorizontal />}
          onClick={() => {
            setSelectedTool("rect");
          }}
        ></IconButton>
        <IconButton
          activated={selectedTool === "circle"}
          icon={<Circle />}
          onClick={() => {
            setSelectedTool("circle");
          }}
        ></IconButton>
        <IconButton activated = {selectedTool === 'text'} 
          icon={<Text/>} 
          onClick={() => {
            setSelectedTool('text')
          }}>

        </IconButton>
      </div>
    </div>
  );
}