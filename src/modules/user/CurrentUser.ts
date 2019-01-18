import { Resolver, Query, Ctx } from "type-graphql";

import { User } from "../../entity/User";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class CurrentUserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() context: MyContext): Promise<User | undefined> {
    const currentSessionUserId = context.req.session!.userId;
    if (!currentSessionUserId) {
      return undefined;
    }

    const currentUser = User.findOne(currentSessionUserId);
    return currentUser;
  }
}
