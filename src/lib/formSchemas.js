import { z } from "zod/v4";
import bcrypt from "bcrypt";
import { Users } from "./database";

export const SignupFormSchema = z.object({
  displayName: z.string().min(3, "Display name must be at least 3 characters long."),
  username: z.string().min(3, "Username must be at least 3 characters long.").refine((value) => {
    const user = Users.query().equalTo("username", value).first();
    return !user;
  }, 'Username is already in use.'),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const SigninFormSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});
