
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module.js';
import { ProduitModule } from './produit/produit.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'gestion_produits',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ProduitModule,
  ],
})
export class AppModule {}
