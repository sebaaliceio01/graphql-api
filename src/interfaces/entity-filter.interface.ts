import { SelectQueryBuilder } from "typeorm";

export interface IEntityFilter<T> {
  type: string
  getQuery(query: SelectQueryBuilder<T>, value: string | number | Date): SelectQueryBuilder<T>
}
