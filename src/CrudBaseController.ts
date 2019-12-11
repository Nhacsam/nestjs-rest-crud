import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import {
  CrudRequest,
  CreateManyDto,
  CrudRequestInterceptor,
  ParsedRequest,
  CrudRequestOptions,
} from '@nestjsx/crud';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { CrudServiceInterface } from './service/CrudServiceInterface';
import { HttpExceptionDto } from '../../nestjs-api-utils';

interface EmptyConstructor<T> {
  new (): T;
}

export abstract class CrudBaseController<
  InputDto,
  Entity = InputDto,
  OutputDto = Entity
> {
  protected abstract DtoType: EmptyConstructor<InputDto>;
  protected abstract EntityType: EmptyConstructor<Entity>;
  protected crudOptions: CrudRequestOptions = {
    query: {},
    routes: {},
    params: {},
  };

  constructor(protected service: CrudServiceInterface<Entity>) {}

  @Get('/')
  @UseInterceptors(new CrudRequestInterceptor())
  async getMany(@ParsedRequest() req: CrudRequest) {
    req.options = this.crudOptions;
    return this.service.getMany(req);
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiNotFoundResponse({ type: HttpExceptionDto })
  @UseInterceptors(new CrudRequestInterceptor())
  async getOne(@ParsedRequest() req: CrudRequest, @Param('id') id: string) {
    req.options = this.crudOptions;
    return this.service.getOne(req);
  }

  @Post('/')
  @UseInterceptors(new CrudRequestInterceptor())
  async createOne(@ParsedRequest() req: CrudRequest, @Body() dto: InputDto) {
    req.options = this.crudOptions;
    const entity = await this.transformDtoToEntity(dto);
    return this.service.createOne(req, entity);
  }

  @Post('/bulk')
  @UseInterceptors(new CrudRequestInterceptor())
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: CreateManyDto<InputDto>,
  ) {
    req.options = this.crudOptions;
    return this.service.createMany(req, dto);
  }

  @Put('/:id')
  @UseInterceptors(new CrudRequestInterceptor())
  async replaceOne(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: InputDto,
    @Param('id') id: string,
  ) {
    req.options = this.crudOptions;
    const entity = await this.transformDtoToEntity(dto);
    return this.service.replaceOne(req, entity);
  }

  @Patch('/:id')
  @UseInterceptors(new CrudRequestInterceptor())
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @Body() dto: InputDto,
    @Param('id') id: string,
  ) {
    req.options = this.crudOptions;
    const entity = await this.transformDtoToEntity(dto);
    return this.service.replaceOne(req, entity);
  }

  @Delete('/:id')
  @UseInterceptors(new CrudRequestInterceptor())
  async deleteOne(@ParsedRequest() req: CrudRequest, @Param('id') id: string) {
    req.options = this.crudOptions;
    return this.service.deleteOne(req);
  }

  protected transformDtoToEntity(dto: InputDto): Promise<Entity> | Entity {
    if (dto instanceof this.EntityType) {
      return dto;
    }
    const entity = new this.EntityType();
    Object.assign(entity, dto);
    return entity;
  }
}
