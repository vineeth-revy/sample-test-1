import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateQueryBuilder, UpdateResult } from 'typeorm';
import { CreateProductDTO } from './dto/createproduct.DTO';
import { UpdateProductDTO } from './dto/updateproduct.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Product) private productRepository: Repository<Product> 
    ) {}

    private products: Product[] = [];
    async create(product: CreateProductDTO): Promise<Product> {
        
        return await this.productRepository.save(product);
    }

    async findOne(id: string | number): Promise<Product> {

        let result = await this.productRepository.findOne(id);

        if(!result)
            throw new NotFoundException();

        return result;
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async delete(id: string | number): Promise<DeleteResult> {
        
        let result = await this.productRepository.delete(id);

        if(result.affected==0)
            throw new NotFoundException("Product does not exist");

        return result;
    }

    async update(id: string | number,product: UpdateProductDTO): Promise<Product>{

        let findResult = await this.productRepository.findOne(id);

        if(!findResult)
            throw new NotFoundException("Product does not exist");

        //return await this.productRepository.update(id,product);

        await this.productRepository.merge(findResult,product);
        return await this.productRepository.save(findResult);
 
    }
}
