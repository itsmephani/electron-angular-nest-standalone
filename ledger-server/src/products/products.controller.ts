import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  index(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  async create(@Body() product: Product): Promise<any> {
    return this.productsService.create(product);
  }
}
