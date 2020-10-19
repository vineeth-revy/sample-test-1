import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/products/entity/product.entity';

@Module({
    imports:[
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'test',
            entities: [Product],
            synchronize: true
        })
    ]
})
export class DatabaseModule {}
