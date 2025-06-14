// backend/src/app.controller.ts
import { Controller, Get, Query, Param } from '@nestjs/common'
import { AppService, Product } from './app.service'

@Controller()     // usa la ruta raíz
export class AppController {
  constructor(private readonly appService: AppService) {}

  // GET /products?page=1&limit=10
  @Get('products')
  getAllProducts(
    @Query('page')  page:  string = '1',
    @Query('limit') limit: string = '10',
  ): { items: Product[]; total: number } {
    return this.appService.getProducts(+page, +limit)
  }

  // GET /products/:id
  @Get('products/:id')
  getProduct(
    @Param('id') id: string,
  ): Product {
    return this.appService.getProductById(id)
  }
  getHello(): string {
  return 'API Pet Supply!';
}

}
