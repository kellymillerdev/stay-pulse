import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SubscriptionStatus, RiskFactor } from '../dto/subscription.dto';

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  merchantId: string;

  @Column()
  customerId: string;

  @Column()
  planId: string;

  @Column({
    type: 'enum',
    enum: SubscriptionStatus,
    default: SubscriptionStatus.ACTIVE,
  })
  status: SubscriptionStatus;

  @Column({ type: 'enum', enum: ['monthly', 'yearly'] })
  frequency: 'monthly' | 'yearly';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'int', default: 0 })
  billingCycleCount: number;

  @Column({ type: 'timestamp', nullable: true })
  lastBillingDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  nextBillingDate: Date;

  @Column({ type: 'decimal', precision: 4, scale: 3, nullable: true })
  churnRiskScore: number;

  @Column('jsonb', { nullable: true })
  riskFactors: RiskFactor[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
