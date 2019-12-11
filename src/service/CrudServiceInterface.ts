import {
  CrudRequest,
  GetManyDefaultResponse,
  CreateManyDto,
} from '@nestjsx/crud';

export interface CrudServiceInterface<T> {
  getMany(req: CrudRequest): Promise<GetManyDefaultResponse<T> | T[]>;

  getOne(req: CrudRequest): Promise<T>;

  createOne(req: CrudRequest, dto: T): Promise<T>;

  createMany(req: CrudRequest, dto: CreateManyDto): Promise<T[]>;

  updateOne(req: CrudRequest, dto: T): Promise<T>;

  replaceOne(req: CrudRequest, dto: T): Promise<T>;

  deleteOne(req: CrudRequest): Promise<void | T>;
}
