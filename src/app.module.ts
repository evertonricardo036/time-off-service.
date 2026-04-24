import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Balance } from './balance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [Balance],
      synchronize: true, // Isso cria as tabelas automaticamente
    }),
    TypeOrmModule.forFeature([Balance]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}