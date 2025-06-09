"use server";

import bcrypt from "bcrypt";
import { flattenError } from "zod/v4";
import { redirect } from "next/navigation";

import { SigninFormSchema, SignupFormSchema } from "@/lib/formSchemas";
import { Users } from "@/lib/database";
import { deleteSession, setSessionValue } from "@/lib/session";
import { isAuthenticated } from "@/lib/authorization";

export async function signup(currentState, formData) {
  const validatedFields = SignupFormSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return { 
      previousValues: Object.fromEntries(formData),
      errors: flattenError(validatedFields.error).fieldErrors
    };
  }

  // TODO: I don't think I need to save the inserted user in to a variable
  const user = Users.insert({
    displayName: validatedFields.data.displayName,
    username: validatedFields.data.username,
    email: validatedFields.data.email,
    password: bcrypt.hashSync(validatedFields.data.password, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return redirect("/signin");
}

export async function signin(currentState, formData) {
  const validatedFields = SigninFormSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return { 
      previousValues: Object.fromEntries(formData),
      errors: flattenError(validatedFields.error).fieldErrors
    };
  }

  const user = Users.query().equalTo("username", validatedFields.data.username).first();
  if (!user || !bcrypt.compareSync(validatedFields.data.password, user.password)) {
    return { 
      previousValues: Object.fromEntries(formData),
      errors: { page: "Invalid username or password." }
    };
  }

  await setSessionValue("userId", user._id);
  return redirect("/dashboard");
}

export async function signout() {
  if (!await isAuthenticated()) {
    return redirect("/signin");
  }

  await deleteSession();
  redirect("/signin");
}
