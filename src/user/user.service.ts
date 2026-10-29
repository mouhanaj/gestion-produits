
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: data.email },
    });

    if (existing) {
      throw new ConflictException('Cet email existe déjà');
    }

    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Utilisateur ${id} introuvable`);
    }

    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    const user = await this.getUserById(id);

    if (data.email && data.email !== user.email) {
      const existing = await this.userRepository.findOne({
        where: { email: data.email },
      });

      if (existing) {
        throw new ConflictException('Cet email existe déjà');
      }
    }

    Object.assign(user, data, { id: user.id });
    return this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    await this.userRepository.remove(user);
  }
}
