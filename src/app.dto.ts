import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()   @IsNotEmpty() name!: string;
  @IsNumber()   @Min(0)        price!: number;
  @IsString()   @IsNotEmpty() description!: string;
}

export class UpdateProductDto {
  @IsOptional() @IsString()   @IsNotEmpty() name?: string;
  @IsOptional() @IsNumber()   @Min(0)        price?: number;
  @IsOptional() @IsString()   @IsNotEmpty() description?: string;
}

export class DeleteProduct{
  @IsOptional() @IsString()   @IsNotEmpty() name?: string;
  @IsOptional() @IsNumber()   @Min(0)        price?: number;
  @IsOptional() @IsString()   @IsNotEmpty() description?: string;
}
