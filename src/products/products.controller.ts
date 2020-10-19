import { Body, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UseFilters, UseInterceptors } from '@nestjs/common';
import { CreateProductDTO } from './dto/createproduct.DTO';
import { ProductsService } from './products.service';
import { CustomHTTPExceptionFilter } from '../common/filters/http-exception.filter';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateProductDTO } from './dto/updateproduct.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Product } from './entity/product.entity';

@Controller('products')
@UseFilters(CustomHTTPExceptionFilter)
@UseInterceptors(TransformInterceptor)
@ApiTags('Products')
export class ProductsController {

    constructor(private productService: ProductsService) {}

    @Get('error')
    @ApiForbiddenResponse({description:"Custom Exception Filter, Forbidden Error"})
    error(): any {
        throw new ForbiddenException();
    }

    @Get()
    @ApiOkResponse({description:"OK"})
    async findAll(): Promise<Product[]> {
        
        return await this.productService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({description:"ok"})
    @ApiParam({name:"id",description:"id of the product"})
    @ApiNotFoundResponse({description:"Product does not exist"})
    async findOne(@Param('id') id): Promise<Product> {
        return await this.productService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({description:"product successfully created"})
    @ApiBadRequestResponse({description:"Bad request, Validation error"})
    async create(@Body() body: CreateProductDTO): Promise<Product> {
        return await this.productService.create(body);
    }

    @Put(':id')
    @ApiBadRequestResponse({description:"Bad request, Validation error"})
    @ApiOkResponse({description:"ok"})
    @ApiNotFoundResponse({description:"Product does not exist"})
    @ApiParam({name:"id",description:"id of the product"})
    async update(@Param('id') id, @Body() body: UpdateProductDTO): Promise<Product> {
        return await this.productService.update(id,body);
    }

    @Delete(':id')
    @ApiNotFoundResponse({description:"Product does not exist"})
    @ApiOkResponse({description:"ok"})
    @ApiParam({name:"id",description:"id of the product"})
    async delete(@Param('id') id): Promise<DeleteResult> {
        return await this.productService.delete(id);
    }
}
