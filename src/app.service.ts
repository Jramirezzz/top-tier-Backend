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

  getProducts(page = 1, limit = 10): { items: Product[]; total: number } {
    const start = (page - 1) * limit
    const end   = start + limit
    return {
      items: this.products.slice(start, end),
      total: this.products.length,
    }
  }

  getProductById(id: string): Product {
    const prod = this.products.find(p => p.id === id)
    if (!prod) {
      throw new NotFoundException(`Producto con id "${id}" no encontrado`)
    }
    return prod
  }

  createProduct(dto: CreateProductDto): Product {
    const newProd: Product = {
      id: Date.now().toString(),
      ...dto,
    };
    this.products.push(newProd);
    return newProd;
  }

  updateProduct(id: string, dto: UpdateProductDto): Product {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx < 0) throw new NotFoundException(`Producto ${id} no encontrado`);
    const updated = { ...this.products[idx], ...dto };
    this.products[idx] = updated;
    return updated;
  }

  deleteProduct(id: string): void {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx < 0) throw new NotFoundException(`Producto ${id} no encontrado`);
    this.products.splice(idx, 1);
  }

}
