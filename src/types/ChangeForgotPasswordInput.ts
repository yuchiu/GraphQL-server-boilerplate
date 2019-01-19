import { InputType, Field } from "type-graphql";
import { PasswordInput } from "./PasswordInput";

@InputType()
export class ChangeForgotPasswordInput extends PasswordInput {
  @Field()
  token: string;
}
