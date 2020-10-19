import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdateProductDTO {

    @IsOptional()
    @IsString()
    @ApiProperty({
        required:false
    })
    name?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        required:false
    })
    qty?: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        required:false
    })
    price?: number;
}