import express from "express";
import jwt from "jsonwebtoken";
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import {
  CreateSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

const Client = prismaClient;

interface userType {
  username: string;
  password: string;
}
const users: any = [];

app.post("/signup", async (req, res) => {
  const parseData = CreateSchema.safeParse(req.body);

  if (!parseData.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }

  try {
    const createUser = await Client.user.create({
      data: {
        email: parseData.data.email,
        password: parseData.data.password,
        name: parseData.data.name,
        photo: parseData.data.photo,
      },
    });

    res.json({
      message: "you are signed up!",
      userId: createUser.id,
    });
  } catch (e) {
    res.json({
      message: "User aleready exists!",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parseData = SigninSchema.safeParse(req.body);

  if (!parseData.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }

  try {
    const user = await Client.user.findFirst({
      where: {
        email: parseData.data.email,
        password: parseData.data.password,
      },
    });

    if (!user) {
      res.json({
        message: "user not found",
      });
      return;
    }
    console.log(user);

    // const userId = findUser.id;

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    // console.log(typeof token)

    res.json({
      message: "you are signin",
      token,
    });
  } catch (e) {
    console.log(e);
  }
});

app.post("/room", middleware, async (req, res) => {
  // console.log("on room route");
  const parseData = CreateRoomSchema.safeParse(req.body)
  if(!parseData.success){
    res.json({
      message:"Enter valid Name"
    })
    return;
  }

  // @ts-ignore
  const userId = req.userId;
 try{
   const addRoom = await Client.room.create({
     data: {
       slug: parseData.data.slug,
       adminId: userId
     },
   });

  //  if (!addRoom) {
  //    return;
  //  }

   res.json({
     message: "Room added successfully!",
     roomId: addRoom.id,
   });
 }catch(e){
    res.json({
        message:"Room already exists with this name"
    })
 }
});

app.get("/chats/:roomId", async(req,res) => {
  try{
    const roomId = Number(req.params.roomId);
    const messages =await prismaClient.chat.findMany({
      where:{
        roomId:roomId
      },
      orderBy:{
        id:"desc"
      },
      take:100
    })

    res.status(200).json({
      messages
    })
  }
  catch(e){
    res.json({
      message:"something is missing!",
      messages :[]
    })
  }
})

app.get("/room/:slug",async(req,res) => {
  const slug = req.params.slug;
  const roomId = prismaClient.room.findFirst({
    where:{
      slug:slug
    }
  })
  res.json({
    roomId
  });
})



app.listen(4000);
