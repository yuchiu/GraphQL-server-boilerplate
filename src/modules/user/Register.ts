import { Resolver, Mutation, Query, Arg, UseMiddleware } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

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
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();
    return user;
  }
}
