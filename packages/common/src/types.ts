import z from "zod";

export const CreateSchema = z.object({
  email: z.string().min(3).max(50),
  password: z.string().min(6),
  name: z.string().min(3),
  photo:z.string().optional()
});

export const SigninSchema = z.object({
  email: z.string().min(3).max(50),
  password: z.string().min(6),
});

export const CreateRoomSchema = z.object({
    slug:z.string().min(3).max(20),
})