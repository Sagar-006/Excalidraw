import { Tool } from "@/app/components/Canvas";
import { getExistingShapes } from "./http";
import { Shapes } from "lucide-react";
// import React from "react";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "pencil";
      points:{x:number,y:number}[];
      // startX: number;
      // startY: number;
      // endX:number;
      // endY:number;
    }
    | {
      type:'text';
      x:number;
      y:number;
      content:string;
    }; 

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[];
  private roomId: string;
  private socket: WebSocket;
  private clicked: boolean;
  private startX = 0;
  private startY = 0;
  private selectedTool: "rect" | "circle" | "pencil" | "text" = "pencil";
  private currentPencilPoints: { x: number; y: number }[] = [];
  private isTyping = false;
  private currentText = "";
  private textStartX = 0;
  private textStartY = 0;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.existingShapes = [];
    this.roomId = roomId;
    this.socket = socket;
    this.clicked = false;
    this.init();
    this.initHandlers();
    this.clearCanvas();
    this.initMouseHandlers();
    this.initKeyboardHandlers();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    this.canvas.removeEventListener("mouseup", this.mouseUpHandler);
    this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    window.removeEventListener("keydown", this.keyboardHandler);
  }

  setTool(tool: "circle" | "rect" | "pencil" | "text") {
    this.selectedTool = tool;
  }

  async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  initHandlers() {
    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "chat") {
        const parsedShape = JSON.parse(message.message);
        this.existingShapes.push(parsedShape.shape);
        this.clearCanvas();
      }
    };
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "rgba(0,0,0)";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.existingShapes.forEach((shape) => {
      if (shape.type === "rect") {
        this.ctx.strokeStyle = "rgba(255,255,255)";
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(
          shape.centerX,
          shape.centerY,
          Math.abs(shape.radius),
          0,
          Math.PI * 2
        );
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "pencil") {
        this.ctx.strokeStyle = "rgba(255,255,255)";
        this.ctx.beginPath();
        const points = shape.points;
        if (points && points.length > 0) {
          this.ctx.moveTo(points[0].x, points[0].y);
          for (let i = 1; i < points.length; i++) {
            this.ctx.lineTo(points[i].x, points[i].y);
          }
          this.ctx.stroke();
          this.ctx.closePath();
        }
      } else if (shape.type === "text") {
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(shape.content, shape.x, shape.y);
      }
    });

    // Draw preview text while typing
    if (this.isTyping) {
      this.drawPreviewText();
    }
  }

  drawPencilStroke(points: { x: number; y: number }[]) {
    if (points.length === 0) return;
    this.ctx.strokeStyle = "white";
    this.ctx.beginPath();
    this.ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i].x, points[i].y);
    }
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawPreviewText() {
    if (!this.isTyping) return;
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(this.currentText, this.textStartX, this.textStartY);
  }

  mouseDownHandler = (e: MouseEvent) => {
    // Save existing typed text before starting new drawing or typing session
    if (this.isTyping && this.currentText.length > 0) {
      const shape: Shape = {
        type: "text",
        x: this.textStartX,
        y: this.textStartY,
        content: this.currentText,
      };
      this.existingShapes.push(shape);
      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: this.roomId,
        })
      );
      this.isTyping = false;
      this.currentText = "";
      this.clearCanvas();
    }

    this.clicked = true;
    this.startX = e.clientX;
    this.startY = e.clientY;

    if (this.selectedTool === "pencil") {
      this.currentPencilPoints = [{ x: e.clientX, y: e.clientY }];
    } else if (this.selectedTool === "text") {
      this.isTyping = true;
      this.currentText = "";
      this.textStartX = e.clientX;
      this.textStartY = e.clientY;
      this.clearCanvas();
    }
  };

  mouseUpHandler = (e: MouseEvent) => {
    this.clicked = false;
    const width = e.clientX - this.startX;
    const height = e.clientY - this.startY;
    let shape: Shape | null = null;
    if (this.selectedTool === "rect") {
      shape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width,
        height,
      };
    } else if (this.selectedTool === "circle") {
      const radius = Math.max(width, height) / 2;
      shape = {
        type: "circle",
        radius: radius,
        centerX: this.startX + radius,
        centerY: this.startY + radius,
      };
    } else if (
      this.selectedTool === "pencil" &&
      this.currentPencilPoints.length > 1
    ) {
      shape = {
        type: "pencil",
        points: this.currentPencilPoints,
      };
      this.currentPencilPoints = [];
    } else if (this.selectedTool === "text" && this.currentText.length > 0) {
      shape = {
        type: "text",
        x: this.textStartX,
        y: this.textStartY,
        content: this.currentText,
      };
      this.currentText = "";
      this.isTyping = false;
    }
    if (!shape) {
      return;
    }
    this.existingShapes.push(shape);

    this.socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          shape,
        }),
        roomId: this.roomId,
      })
    );
  };

  mouseMoveHandler = (e: MouseEvent) => {
    if (this.clicked) {
      const width = e.clientX - this.startX;
      const height = e.clientY - this.startY;
      this.clearCanvas();
      this.ctx.strokeStyle = "rgba(255,255,255)";
      if (this.selectedTool === "rect") {
        this.ctx.strokeRect(this.startX, this.startY, width, height);
      } else if (this.selectedTool === "circle") {
        const radius = Math.max(width, height) / 2;
        const centerX = this.startX + radius;
        const centerY = this.startY + radius;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (this.selectedTool === "pencil") {
        this.currentPencilPoints.push({ x: e.clientX, y: e.clientY });
        this.clearCanvas();
        this.drawPencilStroke(this.currentPencilPoints);
      }
    }
  };

  initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    this.canvas.addEventListener("mouseup", this.mouseUpHandler);
    this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
  }

  keyboardHandler = (e: KeyboardEvent) => {
    if (!this.isTyping) return;

    if (e.key === "Enter") {
      const shape: Shape = {
        type: "text",
        x: this.textStartX,
        y: this.textStartY,
        content: this.currentText,
      };
      this.existingShapes.push(shape);
      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape }),
          roomId: this.roomId,
        })
      );
      this.isTyping = false;
      this.clearCanvas();
      return;
    }

    // support backspace
    if (e.key === "Backspace") {
      e.preventDefault();
      this.currentText = this.currentText.slice(0, -1);
      this.clearCanvas();
      this.drawPreviewText();
      return;
    }

    // add visible (single-char) keys only
    if (e.key.length === 1) {
      this.currentText += e.key;
      this.clearCanvas();
      this.drawPreviewText();
    }
  };

  initKeyboardHandlers() {
    window.addEventListener("keydown", this.keyboardHandler);
  }
}
