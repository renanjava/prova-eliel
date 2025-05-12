import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Trabalho, Prisma } from '@prisma/client';

@Injectable()
export class TrabalhoRepository {
  constructor(private prisma: PrismaService) {}

  async trabalho(
    trabalhoWhereUniqueInput: Prisma.TrabalhoWhereUniqueInput,
  ): Promise<Trabalho | null> {
    return this.prisma.trabalho.findUnique({
      where: trabalhoWhereUniqueInput,
      include: { pessoa: true },
    });
  }

  async trabalhos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TrabalhoWhereUniqueInput;
    where?: Prisma.TrabalhoWhereInput;
    orderBy?: Prisma.TrabalhoOrderByWithRelationInput;
  }): Promise<Trabalho[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.trabalho.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { pessoa: true },
    });
  }

  async createTrabalho(data: Prisma.TrabalhoCreateInput): Promise<Trabalho> {
    return this.prisma.trabalho.create({
      data,
      include: { pessoa: true },
    });
  }

  async updateTrabalho(params: {
    where: Prisma.TrabalhoWhereUniqueInput;
    data: Prisma.TrabalhoUpdateInput;
  }): Promise<Trabalho> {
    const { where, data } = params;
    return this.prisma.trabalho.update({
      data,
      where,
    });
  }

  async deleteTrabalho(
    where: Prisma.TrabalhoWhereUniqueInput,
  ): Promise<Trabalho> {
    return this.prisma.trabalho.delete({
      where,
      include: { pessoa: true },
    });
  }
}
