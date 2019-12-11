import { FindOneOptions, FindManyOptions } from 'typeorm';

export interface CrudRepository<Entity> {
  findOne(
    id?: string | number | Date,
    options?: FindOneOptions<Entity>,
  ): Promise<Entity | undefined>;
  findOne(options?: FindOneOptions<Entity>): Promise<Entity | undefined>;

  find(options?: FindManyOptions<Entity>): Promise<Entity[]>;
}
