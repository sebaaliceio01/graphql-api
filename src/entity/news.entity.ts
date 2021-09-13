import { Field, ObjectType } from "type-graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Repository } from "typeorm";

@ObjectType()
@Entity()
export class News {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field({ nullable: true })
  @Column({ nullable: true })
  title:string

  @Field({ nullable: true })
  @Column({ type: 'text' })
  subtitle?: string

  @Field({ nullable: true })
  @Column({ type: 'text' })
  image: string

  @Field({ nullable: true })
  @Column({ type: 'text' })
  text: string

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp' })
  updatedAt: Date

  @Field({ nullable: true })
  @CreateDateColumn({ type: 'timestamp' })
  deletedAt: Date
}