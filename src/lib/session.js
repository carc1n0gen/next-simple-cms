import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

export function makeExpireDate(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (_) {
    // Session cookie is either invalid expired, or missing. We will
    // just ignore this error and a new session will be created
    return null;
  }
}

export async function startSession() {
  const expiresAt = makeExpireDate(7);
  const session = await encrypt({ expiresAt });
  const cookieStore = await cookies();
  
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function extendSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const newExpiresAt = makeExpireDate(7);
  const newSession = await encrypt({
    ...payload,
    expiresAt: newExpiresAt,
  });

  cookieStore.set('session', newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: newExpiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// I am worried if I cache this, we will be using
// outdated session data when setting multuple new
// session values.
// export const getSession = cache(async () => {
//   const cookieStore = await cookies();
//   const session = cookieStore.get('session')?.value;
//   const payload = await decrypt(session); 

//   return payload;
// });

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = await decrypt(session); 

  return payload;
}

export async function setSession(session) {
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: makeExpireDate(7),
    sameSite: "lax",
    path: "/",
  });
}

export async function setSessionValue(key, value) {
  const payload = await getSession();

  const newPayload = {
    ...payload,
    [key]: value,
  }
  const newSession = await encrypt(newPayload);

  await setSession(newSession);
}

export async function getSessionValue(key) {
  const payload = await getSession();

  if (!payload) {
    return null;
  }

  return payload[key];
}

export async function deleteSessionValue(key) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = await decrypt(session);

  const { [key]: _, ...newPayload } = payload; // remove the key from the payload with destructuring
  const newSession = await encrypt(newPayload);
  await setSession(newSession);
}
