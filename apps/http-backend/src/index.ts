import express from 'express';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import {CreateSchema, SigninSchema, CreateRoomSchema} from '@repo/common/types';
import  {prismaClient} from '@repo/db/client'

const app = express();
app.use(express.json());

const Client =prismaClient;

interface userType {
    username:string,
    password:string,
}
    const users:any =  [];

app.post("/signup",async(req,res) => {
    
    const body = CreateSchema.safeParse(req.body);

    if(!body.success){
        res.json({
            message:"incorrect inputs"
        })
        return
    }

    const createUser = await Client.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
        name:req.body.name,
        photo:req.body.photo,
      },
    });
    
    res.json({
        message:"you are signed up!"
        
    })
})

app.post("/signin",async(req,res) => {
    const parse = SigninSchema.safeParse(req.body);

    if(!parse.success){
        res.json({
            message:"incorrect inputs"
        })
        return
    }
    const username = req.body.username

    const findUser = await Client.user.findFirst({
        where:{
            email:req.body.email,
            password:req.body.password,

        }
    })
    
        if(!findUser){
            return
        } 
        console.log(findUser)
    
        const userId = findUser.id; 

        const token = jwt.sign({userId},JWT_SECRET)
      
        res.json({
            message:"you are signin",
            token,
        })
    
})

app.post("/room",middleware,async(req,res) => {
    console.log("on room route")
    // @ts-ignore
    const userId:any = req.userId ;
    console.log(userId)

    const addRoom = await Client.room.create({
        data:{
            adminId:userId,
            slug:req.body.slug,


        }
    })

    if(!addRoom){
        return
    }

    res.json({
        message:"Room added successfully!"
    })
})

app.listen(4000)