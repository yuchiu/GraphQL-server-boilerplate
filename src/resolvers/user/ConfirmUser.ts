import { Resolver, Mutation, Arg } from "type-graphql";

import { User } from "../../entity/User";
import redisClient from "../../config/redisClient";
import { confirmUserPrefix } from "../../utils/redisPrefix";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("token")
    token: string
  ): Promise<boolean> {
    const userId = await redisClient.get(confirmUserPrefix + token);

    if (!userId) {
      return false;
    }
    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });

    await redisClient.del(confirmUserPrefix + token);

    return true;
  }
}
