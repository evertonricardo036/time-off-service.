import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: string;

  @Column()
  locationId: string;

  @Column('float')
  amount: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  lastSync: Date;
}