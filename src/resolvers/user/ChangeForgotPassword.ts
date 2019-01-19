import { Resolver, Mutation, Arg, Ctx } from "type-graphql";

import { User } from "../../entity/User";
import { forgotPasswordPrefix } from "../../utils/redisPrefix";
import { ChangeForgotPasswordInput } from "../../types/ChangeForgotPasswordInput";
import redisClient from "../../config/redisClient";
import { hashPassword } from "../../utils/hashPassword";
import { MyContext } from "../../types/MyContext";

@Resolver()
export class ChangeForgotPasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changeForgotPassword(
    @Arg("data")
    { token, password }: ChangeForgotPasswordInput,
    @Ctx() context: MyContext
  ): Promise<User | null> {
    const userId = await redisClient.get(forgotPasswordPrefix + token);
    if (!userId) {
      return null;
    }
    const user = await User.findOne(userId);
    if (!user) {
      return null;
    }
    const hashedNewPassword = await hashPassword(password);

    user.password = hashedNewPassword;

    await user.save();

    await redisClient.del(forgotPasswordPrefix + token);

    //sign in user
    context.req.session!.userId = user.id;
    return user;
  }
}
