import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionMonitorService } from './services/subscription-monitor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [SubscriptionMonitorService],
  exports: [SubscriptionMonitorService],
})
export class SubscriptionModule {}
