
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('produits')
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nom: string;

  @Column('decimal', { precision: 10, scale: 2 })
  prix: number;

  @Column({ type: 'text', nullable: true })
  description: string | null;
}
