import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('sync')
  async sync(@Body() data: { employeeId: string; locationId: string; amount: number }) {
    // Aqui chamamos o serviço que você já configurou com a lógica de idempotência
    return await this.appService.syncBalance(data);
  }
}