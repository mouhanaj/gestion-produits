
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produit } from './entities/produit.entity.js';
import { ProduitController } from './produit.controller.js';
import { ProduitService } from './produit.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Produit])],
  controllers: [ProduitController],
  providers: [ProduitService],
})
export class ProduitModule {}
