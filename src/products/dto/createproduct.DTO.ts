import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateProductDTO {

    @IsOptional()
    @IsEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number;
}