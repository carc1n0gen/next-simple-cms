import "server-only";

import { neboa } from "neboa";

const db = neboa("database.db");

export const Users = db.collection("users");

export const Posts = db.collection("posts");
