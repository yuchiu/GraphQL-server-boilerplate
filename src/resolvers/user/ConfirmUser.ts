import { Resolver, Mutation, Arg } from "type-graphql";

import { User } from "../../entity/User";
import redisClient from "../../config/redisClient";

@Resolver()
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(
    @Arg("confirmationToken")
    confirmationToken: string
  ): Promise<boolean> {
    const userId = await redisClient.get(confirmationToken);

    if (!userId) {
      return false;
    }
    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });

    await redisClient.del(confirmationToken);

    return true;
  }
}
