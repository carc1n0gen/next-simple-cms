import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";

import { Users } from "@/lib/database";
import { getSessionValue } from "@/lib/session";

const getUserFromSession = cache(async () => {
  const userId = await getSessionValue("userId") || null;
  return Users.query().equalTo("_id", userId).first();
});

export async function getAuthenticatedUser() {
  const user = await getUserFromSession();

  if (!user || user.disabledAt) {
    redirect("/signin");
  }

  const { password, ...sanitizedUser } = user; // destructure out the password before returning
  return sanitizedUser;
};

export async function isAuthenticated() {
  const user = await getUserFromSession();
  return user && !user.disabledAt; // User exists and is not disabled
};
