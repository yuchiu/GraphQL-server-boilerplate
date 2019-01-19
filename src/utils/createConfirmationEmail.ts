import createUUID from "./createUUID";

import redisClient from "../config/redisClient";

const emailExpirationTime = 60 * 60 * 24; // expire in 1 day

export const createConfirmationUrl = async (
  userId: number,
  redisPrefix: string,
  apiEndPoint: string
) => {
  const confirmationToken = createUUID();

  await redisClient.set(
    redisPrefix + confirmationToken,
    userId,
    "ex",
    emailExpirationTime
  );

  return `http://localhost:3000${apiEndPoint}/${confirmationToken}`;
};
