import express from 'express';
import jwt from 'jsonwebtoken';
import { middleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import {CreateSchema, SigninSchema, CreateRoomSchema} from '@repo/common/types';
// import { User } from '@repo/prisma/prisma'

const app = express();
app.use(express.json());

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
    
    res.json({
        message:"you are signed up",
        users
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
    

    // const findUser = users.filter(((user:any) => user.username == username && user.password == password ));
    const userId = 'as'
    if(!userId) return 
    
        const token = jwt.sign({userId},JWT_SECRET)
        
        res.json({
            message:"you are signin",
            token,
        })
    

    // res.json({
    //     message:"you are signin",
    //     findUser
    // })
})

app.post("/room",middleware,(req,res) => {
    console.log("on room route")
    // @ts-ignore
    const id = req.userId ;
    console.log(id)

    res.json({
        id
    })
})

app.listen(4000)