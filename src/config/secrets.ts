import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const { NODE_ENV } = process.env;

export const { SERVER_HOST } = process.env;
export const { SERVER_PORT } = process.env;
export const { SERVER_URL } = process.env;

export const { SESSION_NAME } = process.env;
export const { SESSION_SECRET } = process.env;

export const { REDIS_HOST } = process.env;
export const { REDIS_PORT } = process.env;
