import { CrudServiceInterface } from './CrudServiceInterface';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

export class CrudService<Entity> extends TypeOrmCrudService<Entity>
  implements CrudServiceInterface<Entity> {}
