import { IEntityFilter } from "@/interfaces/entity-filter.interface";
import { IPaginationRequestInternal } from "@/interfaces/pagination-request-internal.interface";
import { IPaginationResult } from "@/interfaces/pagination-result.interface";
import { ISort } from "@/interfaces/sort.interface";
import { Service } from "typedi";
import { SelectQueryBuilder } from "typeorm";
import { PaginationRequest } from "./pagination-request.type";


type PaginationRequestFull = PaginationRequest & { defaultSort?: ISort }

@Service({ global: true })
export class PaginationService {
  async getPagedResult<T>(query: SelectQueryBuilder<T>, opts?: IPaginationRequestInternal): Promise<IPaginationResult<T>> {
    try {
      const totalCount = await query.getCount()
      const results = await this.paginate<T>(query, opts).getMany()
      return { totalCount, resultCount: totalCount, results }
    } catch(err) {
      throw new Error(err.message)
    }
  }

  async getPaginationResult<T, K = { [key: string]: any }>(opts?: { query: SelectQueryBuilder<T>, filters?: IEntityFilter<T>[], pagination: IPaginationRequestInternal, inputFilters: K }): Promise<IPaginationResult<T>> {
    const { filters, pagination, inputFilters } = opts
    let { query } = opts
    const totalCount = await query.getCount()

    if (inputFilters) {
      filters.forEach(filter => {
        if ( inputFilters[filter.type]) {
          query = filter.getQuery(query, inputFilters[filter.type])
          }
      })
    }

    const resultCount = await query.getCount()
    const results = await this.paginate<T>(query, pagination).getMany()
    
    return {
      resultCount,
      results,
      totalCount,
    }

  }

  paginate<T>(query: SelectQueryBuilder<T>, opts: PaginationRequestFull = {}): SelectQueryBuilder<T> {
    const { page = 1, pageSize = 10, sorts = [], defaultSort } = opts
    const [ firstSort = defaultSort, ...secondarySorts ] : ISort[] = sorts
    query.orderBy(firstSort.sort, firstSort.direction?.toUpperCase() as 'ASC' | 'DESC')
    secondarySorts.forEach(sort => query.addOrderBy(sort.sort, sort.direction?.toUpperCase() as 'ASC' | 'DESC'))
    return (
      query
      .skip((page - 1) * pageSize)
      .take(pageSize)
    )
  }

}