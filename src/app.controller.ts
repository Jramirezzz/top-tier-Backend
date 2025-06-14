import {
  Controller, Get, Post, Put, Delete,
  Param, Query, Body, NotFoundException
} from '@nestjs/common';
import { AppService, Product } from './app.service';
import { CreateProductDto, UpdateProductDto } from './app.dto';  // ← AÑADIR

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('products')
  getAllProducts(
    @Query('page')  page:  string = '1',
    @Query('limit') limit: string = '10',
  ): { items: Product[]; total: number } {
    return this.appService.getProducts(+page, +limit);
  }

  @Get('products/:id')
  getProduct(@Param('id') id: string): Product {
    return this.appService.getProductById(id);
  }

  @Post('products')
  createProduct(@Body() dto: CreateProductDto): Product {          
    return this.appService.createProduct(dto);
  }

  @Put('products/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto                             
  ): Product {
    return this.appService.updateProduct(id, dto);
  }

  @Delete('products/:id')
  deleteProduct(@Param('id') id: string) {
    this.appService.deleteProduct(id);
    return { success: true };
  }
}
