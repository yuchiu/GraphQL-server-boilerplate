import createUUID from "./createUUID";

import redisClient from "../config/redisClient";

const emailExpirationTime = 60 * 60 * 24; // expire in 1 day

export const createConfirmationUrl = async (userId: number) => {
  const confirmationToken = createUUID();

  await redisClient.set(confirmationToken, userId, "ex", emailExpirationTime);

  return `http://localhost:3000/user/confirm/${confirmationToken}`;
};
