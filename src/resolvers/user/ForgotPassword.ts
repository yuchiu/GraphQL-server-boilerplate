import { Resolver, Mutation, Arg } from "type-graphql";

import { User } from "../../entity/User";
import { createConfirmationUrl } from "../../utils/createConfirmationEmail";
import { forgotPasswordPrefix } from "../../utils/redisPrefix";
import { sendEmail } from "../../utils/sendEmail";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email")
    email: string
  ): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return false;
    }

    await sendEmail(
      email,
      await createConfirmationUrl(
        user.id,
        forgotPasswordPrefix,
        "/user/change-password"
      )
    );

    return true;
  }
}
