import { News } from "../../entity/news.entity";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import { CreateNewInput } from "./types/create-new-input.type";

@Resolver(News)
export class NewResolver {
  constructor() {}

  @Query(() => [News])
  async news(): Promise<News[]> {
    const newRepo = getRepository(News);
    return newRepo.find();
  }

  @Query(() => News)
  async getNewById(@Arg('newId') newId: string): Promise<News> {
   try {
     const newRepo = getRepository(News)
     return await newRepo.findOneOrFail(newId)
  } catch(err) {
    throw new Error(err.message)
  }
}

  @Mutation(() => News)
  async createNew(
    @Arg("new", () => CreateNewInput) input: CreateNewInput
  ): Promise<News> {
    try {
      const newRepository = getRepository(News);
      const news = newRepository.create(input);
      return await newRepository.save(news);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation(() => News)
  async updateNew(
    @Arg("update", () => CreateNewInput) input: CreateNewInput
  ): Promise<News> {
    try {
      const newRepo = getRepository(News);
      const news = newRepo.findOneOrFail(input.id);
      return await newRepo.save({ ...news, ...input });
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation(() => News)
  async deleteNew(@Arg("newId") id: string): Promise<boolean> {
    try {
      const newRepo = getRepository(News);
      const result = await newRepo.delete(id);
      return await result.affected === 1;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
