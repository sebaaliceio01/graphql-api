import { Field, InputType } from "type-graphql";
import { News } from "../../../entity/news.entity";

@InputType()
export class CreateNewInput implements Partial<News> {
  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  title:string

  @Field({ nullable: true })
  subtitle?: string

  @Field({ nullable: true })
  image: string

  @Field({ nullable: true })
  text: string
 
}