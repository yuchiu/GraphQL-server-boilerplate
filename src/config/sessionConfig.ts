import connectRedis from "connect-redis";
import session from "express-session";

import redisClient from "./redisClient";
import { NODE_ENV, SESSION_SECRET, SESSION_NAME } from "./secrets";

const RedisStore = connectRedis(session);

const sessionConfig = {
  store: new RedisStore({
    client: redisClient as any
  }),
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    path: "/",
    secure: NODE_ENV === "production",
    maxAge: 604800000 // 1000 * 60 * 60 * 24 * 7 * 4 in milliseconds
  }
};
export default sessionConfig;
