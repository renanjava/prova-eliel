import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck() {
    return `Requisição feita no servidor da porta ${process.env.PORT}`;
  }
}
