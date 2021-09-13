import { IPaginationRequest } from '@/interfaces/pagination-request.interface'
import { ISort } from '@/interfaces/sort.interface'
import { Field, InputType } from 'type-graphql'
import { SortInput } from './sort-input'


@InputType()
export class PaginationRequest implements IPaginationRequest {
  @Field({ nullable: true })
  page?: number

  @Field({ nullable: true })
  pageSize?: number

  @Field(() => [SortInput], { nullable: true })
  sorts?: ISort[]
}
