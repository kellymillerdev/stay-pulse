// subscription.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  merchantId: string;

  @Column()
  customerId: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  frequency: string;

  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
