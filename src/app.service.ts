// backend/src/app.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import productsData from '../data/products.json'

export interface Product {
  id: string
  name: string
  price: number
  description: string
}

@Injectable()
export class AppService {
  private readonly products: Product[] = productsData

  /** Devuelve la página de productos y el total */
  getProducts(page = 1, limit = 10): { items: Product[]; total: number } {
    const start = (page - 1) * limit
    const end   = start + limit
    return {
      items: this.products.slice(start, end),
      total: this.products.length,
    }
  }

  /** Devuelve un sólo producto o lanza 404 */
  getProductById(id: string): Product {
    const prod = this.products.find(p => p.id === id)
    if (!prod) {
      throw new NotFoundException(`Producto con id "${id}" no encontrado`)
    }
    return prod
  }


}
