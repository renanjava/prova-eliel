import { Controller, Get } from '@nestjs/common';
import * as os from 'os';

@Controller()
export class AppController {
  @Get('docker')
  dockerHealthCheck() {
    return `Requisição feita no servidor da porta ${process.env.PORT}`;
  }

  @Get('kubernetes')
  kubernetesHealthCheck() {
    return `Requisição feita no pod ${os.hostname()}`;
  }
}
