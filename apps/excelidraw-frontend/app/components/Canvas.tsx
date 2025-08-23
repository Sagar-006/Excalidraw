'use client'
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import {Circle, CircleArrowDown, Pencil, RectangleHorizontal} from "lucide-react"

type currentShapes = 'pencil' | 'rect' | 'circle';
export function Canvas({
    roomId,
    socket
}:{
    socket:WebSocket;
    roomId:string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedTool,setSelectedTool] = useState<currentShapes>('pencil');

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket,selectedTool);
    }
  }, [canvasRef]);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <div className=" text-black flex fixed bottom-5 right-5 bg-gray-200 p-3 rounded shadow-lg z-50 gap-x-6">
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
      </div>
    </div>
  );
}

function TopBar ({selectedTool,setSelectedTool}:{
  selectedTool:currentShapes,
  setSelectedTool:() => void
}) {
  return (
    <div>
      <IconButton icon={<Pencil />} onClick={() => {}}></IconButton>
      <IconButton icon={<RectangleHorizontal />} onClick={() => {}}></IconButton>
      <IconButton icon={<CircleArrowDown />} onClick={() => {}}></IconButton>
    </div>
  );
}