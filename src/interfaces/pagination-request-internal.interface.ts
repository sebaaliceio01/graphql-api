import { IPaginationRequest } from "./pagination-request.interface";
import { ISort } from "./sort.interface";

export interface IPaginationRequestInternal extends IPaginationRequest {
  defaultSort: ISort
}
