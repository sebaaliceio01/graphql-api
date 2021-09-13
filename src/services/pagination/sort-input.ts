import { ISort } from '@/interfaces/sort.interface'
import { Field, InputType } from 'type-graphql'


@InputType()
export class SortInput implements ISort {
  @Field({ nullable: true })
  sort?: string

  @Field({ nullable: true })
  direction?: 'ASC' | 'DESC'
}
