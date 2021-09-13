export interface IPaginationResult<T> {
  results: T[]
  totalCount?: number
  resultCount?: number
}
