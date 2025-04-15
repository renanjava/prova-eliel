import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Pessoa, Prisma } from '@prisma/client';

@Injectable()
export class PessoaRepository {
  constructor(private prisma: PrismaService) {}

  async pessoa(
    pessoaWhereUniqueInput: Prisma.PessoaWhereUniqueInput,
  ): Promise<Pessoa | null> {
    return this.prisma.pessoa.findUnique({
      where: pessoaWhereUniqueInput,
      include: { trabalho: true },
    });
  }

  async pessoas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PessoaWhereUniqueInput;
    where?: Prisma.PessoaWhereInput;
    orderBy?: Prisma.PessoaOrderByWithRelationInput;
  }): Promise<Pessoa[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pessoa.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: { trabalho: true },
    });
  }

  async createPessoa(data: Prisma.PessoaCreateInput): Promise<Pessoa> {
    return this.prisma.pessoa.create({
      data,
      include: { trabalho: true },
    });
  }

  async updatePessoa(params: {
    where: Prisma.PessoaWhereUniqueInput;
    data: Prisma.PessoaUpdateInput;
  }): Promise<Pessoa> {
    const { where, data } = params;
    return this.prisma.pessoa.update({
      data,
      where,
    });
  }

  async deletePessoa(where: Prisma.PessoaWhereUniqueInput): Promise<Pessoa> {
    return this.prisma.pessoa.delete({
      where,
      include: { trabalho: true },
    });
  }
}
