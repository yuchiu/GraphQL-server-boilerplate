import { Resolver, Mutation, Query, Arg, UseMiddleware } from "type-graphql";

import { User } from "../../entity/User";
import { RegisterInput } from "../../types/register/RegisterInput";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { sendEmail } from "../../utils/sendEmail";
import { createConfirmationUrl } from "../../utils/createConfirmationEmail";
import { confirmUserPrefix } from "../../utils/redisPrefix";
import { hashPassword } from "../../utils/hashPassword";

@Resolver()
export class RegisterResolver {
  // test query that require user to be authenticated before accessing
  @UseMiddleware(isAuthenticated)
  @Query(() => String)
  async hello() {
    return "hello world";
  }

  @Mutation(() => User)
  async register(@Arg("data")
  {
    email,
    firstName,
    lastName,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();
    await sendEmail(
      email,
      await createConfirmationUrl(user.id, confirmUserPrefix, "/user/confirm")
    );
    return user;
  }
}
