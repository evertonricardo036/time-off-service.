import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateBalanceDto } from './create-balance.dto';

@Controller('balances')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll() {
    return this.appService.findAll();
  }

  @Post('sync')
  sync(@Body() createBalanceDto: CreateBalanceDto) {
    return this.appService.syncBalance(createBalanceDto);
  }
}