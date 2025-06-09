import { redirect } from "next/navigation";

import SigninForm from "@/components/forms/SigninForm";
import { isAuthenticated } from "@/lib/authorization";

export default async function Signin() {
  if (await isAuthenticated()) {
    return redirect("/dashboard");
  }

  return <SigninForm />
}
