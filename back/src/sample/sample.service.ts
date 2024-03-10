import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SampleService {
  private logger = new Logger(SampleService.name);
  constructor(private readonly prisma: PrismaService) {}

  async getAllSample() {
    const samples = await this.prisma.sample.findMany();
    this.logger.log(`samples length is ${samples.length}`);
    return samples;
  }
}
