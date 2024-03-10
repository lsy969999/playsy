import { Controller, Get } from '@nestjs/common';
import { SampleService } from './sample.service';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  async getAllSample() {
    return await this.sampleService.getAllSample();
  }
}
