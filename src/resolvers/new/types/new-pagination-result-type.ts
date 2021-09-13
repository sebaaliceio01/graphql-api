import { News } from "../../../entity/news.entity";
import { IPaginationResult } from "@/interfaces/pagination-result.interface";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class NewPaginationResult implements IPaginationResult<News> {
  @Field({ nullable: true })
  totalCount?: number

  @Field({ nullable: true })
  resultCount?: number

  @Field(() => [News], { nullable: true })
  results: News[]
}