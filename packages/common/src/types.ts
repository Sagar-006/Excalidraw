import z from "zod";

export const CreateSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
  name: z.string().min(3),
});

export const SigninSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(6),
});

export const CreateRoomSchema = z.object({
    name:z.string().min(3).max(20),
})