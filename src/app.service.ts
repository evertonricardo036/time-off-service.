import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Balance } from './balance.entity';
import { CreateBalanceDto } from './create-balance.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>,
  ) {}

  // Função para salvar ou atualizar o saldo do funcionário
  async syncBalance(data: CreateBalanceDto): Promise<Balance> {
    const { employeeId, locationId, amount } = data;
    
    let balance = await this.balanceRepository.findOne({ 
      where: { employeeId, locationId } 
    });

    if (balance) {
      balance.amount = amount;
      balance.lastSync = new Date();
    } else {
      balance = this.balanceRepository.create(data);
    }

    return this.balanceRepository.save(balance);
  }

  // Função para listar todos os saldos (para teste)
  findAll(): Promise<Balance[]> {
    return this.balanceRepository.find();
  }
}