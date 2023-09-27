import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Password, User, Cart } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  public getById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  public getByEmail(
    email: User['email'],
  ): Promise<(User & { password: Password }) | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: { password: true },
    });
  }

  public async create(
    userData: Omit<User, 'id' | 'role' | 'cartId'>,
    password: Password['hashedPassword'],
  ): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...userData,
          password: {
            create: {
              hashedPassword: password,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email is already exist');
      }
      throw error;
    }
  }

  public async updateById(
    id: User['id'],
    userData: Omit<User, 'id' | 'role'>,
    password: string | undefined,
  ): Promise<User> {
    try {
      if (password !== undefined) {
        return await this.prismaService.user.update({
          where: { id },
          data: {
            ...userData,
            password: {
              update: {
                hashedPassword: password,
              },
            },
          },
        });
      }
      return await this.prismaService.user.update({
        where: { id },
        data: {
          ...userData,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException("User doesn't exist");
      } else if (error.code === 'P2002') {
        throw new ConflictException('Email is already exist');
      }
      throw error;
    }
  }

  public deleteById(id: User['id']): Promise<User> {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  public async createCart(userId: User['id']): Promise<User & { cart: Cart }> {
    const newCart = await this.prismaService.cart.create({
      data: {
        userId: userId,
      },
    });
    return this.prismaService.user.update({
      where: { id: userId },
      data: {
        cartId: newCart.id,
      },
      include: {
        cart: true,
      },
    });
  }
}
