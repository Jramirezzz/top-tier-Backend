// src/products/products.service.ts
import { Injectable } from '@nestjs/common'
import productsData from '../data/products.json'

interface Product {
  id: string
  name: string
  price: number
  description: string
}

@Injectable()
export class ProductsService {
  // Reutiliza el array del JSON
  private readonly products: Product[] = productsData

  findAll(page = 1, limit = 10) {
    const start = (page - 1) * limit
    const end = start + limit
    return {
      items: this.products.slice(start, end),
      total: this.products.length,
    }
  }
}
