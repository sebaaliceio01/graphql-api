import { INewFilters } from "@/interfaces/new-filters.interface";
import { Field, InputType } from "type-graphql";

@InputType()
export class NewFilters implements INewFilters {
  @Field({ nullable: true })
  title?: string

  @Field({ nullable: true })
  subtitle?: string

  @Field({ nullable: true })
  image?: string

  @Field({ nullable: true })
  text?: string
}