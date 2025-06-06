import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SECRET_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

function makeExpireDate(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
}

export async function signSession(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function verifySession(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error("Session verification failed:", error);
  }
}

export async function createSession(userId) {
  const session = await signSession({ userId, expiresAt });
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
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = await verifySession(session);

  const newPayload = {
    ...payload,
    [key]: value,
  }
  const newSession = await signSession(newPayload);

  cookieStore.set("session", newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: makeExpireDate(7),
    sameSite: "lax",
    path: "/",
  });
}

export async function getSessionValue(key) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = await verifySession(session);

  return payload[key];
}

export async function extendSession() {
  const session = (await cookies()).get('session')?.value;
  const payload = await verifySession(session);

  if (!session || !payload) {
    return null;
  }

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: makeExpireDate(7),
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
