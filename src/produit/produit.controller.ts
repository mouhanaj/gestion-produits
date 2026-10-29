
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProduitService } from './produit.service.js';
import { Produit } from './entities/produit.entity.js';

@Controller('produits')
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()
  create(@Body() data: Partial<Produit>) {
    return this.produitService.create(data);
  }

  @Get()
  findAll() {
    return this.produitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.produitService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Produit>,
  ) {
    return this.produitService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.produitService.remove(id);
  }
}
