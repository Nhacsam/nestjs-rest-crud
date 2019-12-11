import { Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class RestCrudModule {
  static forRoot() {
    return {
      module: RestCrudModule,
    };
  }
}
