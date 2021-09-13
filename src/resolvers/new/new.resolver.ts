import { News } from "../../entity/news.entity";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { CreateNewInput } from "./types/create-new-input.type";
import { NewPaginationResult } from "./types/new-pagination-result-type";
import { PaginationRequest } from "../../services/pagination/pagination-request.type";
import { IPaginationRequestInternal } from "@/interfaces/pagination-request-internal.interface";
import { Inject } from "typedi";
import { PaginationService } from "../../services/pagination/pagination.service";
import { InjectRepository } from "typeorm-typedi-extensions";
import { NewFilters } from "./types/new-filter.type";
import { IEntityFilter } from "@/interfaces/entity-filter.interface";

@Resolver(News)
export class NewResolver {
  filters: IEntityFilter<News>[]
  
  @Inject() private readonly paginationService: PaginationService

  constructor(
    @InjectRepository(News) private readonly newRepo: Repository<News>,
  ) {}

  @Query(() => [News])
  async news(): Promise<News[]> {
    return await  this.newRepo.find();
  }

  @Query(() => News)
  async getNewById(@Arg("newId") newId: string): Promise<News> {
    try {
      return await this.newRepo.findOneOrFail(newId)
      // const newRepo = getRepository(News);
      // return await newRepo.findOneOrFail(newId);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Query(() => NewPaginationResult)
   async getNewPaged(
     @Arg('filters', () => NewFilters, { nullable: true }) inputFilters: NewFilters,
     @Arg('paginationOptions', () => PaginationRequest, { nullable: true }) paginationOptions: PaginationRequest): Promise<NewPaginationResult> {
       const query = this.newRepo.createQueryBuilder('new') 
       const pagination: IPaginationRequestInternal = {
         ...paginationOptions,
          defaultSort: { sort: 'new.id', direction: 'ASC' }
        }
        return await this.paginationService.getPaginationResult({
         query,
         pagination,
         inputFilters,
         filters: this.filters,
        })   
  }

  @Mutation(() => News)
  async createNew(
    @Arg("new", () => CreateNewInput) input: CreateNewInput
  ): Promise<News> {
    try {
      const news = this.newRepo.create(input);
      return await this.newRepo.save(news);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation(() => News)
  async updateNew(
    @Arg("update", () => CreateNewInput) input: CreateNewInput
  ): Promise<News> {
    try {
      const news = this.newRepo.findOneOrFail(input.id);
      return await this.newRepo.save({ ...news, ...input });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation(() => News)
  async deleteNew(@Arg("newId") id: string): Promise<boolean> {
    try {
      const result = await this.newRepo.delete(id);
      return (await result.affected) === 1;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
