
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from './entities/produit.entity.js';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit)
    private readonly produitRepository: Repository<Produit>,
  ) {}

  async create(data: Partial<Produit>): Promise<Produit> {
    const produit = this.produitRepository.create(data);
    return this.produitRepository.save(produit);
  }

  async findAll(): Promise<Produit[]> {
    return this.produitRepository.find();
  }

  async findOne(id: number): Promise<Produit> {
    const produit = await this.produitRepository.findOne({
      where: { id },
    });

    if (!produit) {
      throw new NotFoundException(`Produit ${id} introuvable`);
    }

    return produit;
  }

  async update(
    id: number,
    data: Partial<Produit>,
  ): Promise<Produit> {
    const produit = await this.findOne(id);
    Object.assign(produit, data, { id: produit.id });
    return this.produitRepository.save(produit);
  }

  async remove(id: number): Promise<void> {
    const produit = await this.findOne(id);
    await this.produitRepository.remove(produit);
  }
}
