import { ISort } from "./sort.interface";

export interface IPaginationRequest {
  page?: number;
  pageSize?: number;
  sorts?: ISort[]
}
