// subscription.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepo: Repository<Subscription>,
  ) {}

  async getSubscriptionMetrics(merchantId: string) {
    const subscriptions = await this.subscriptionRepo.find({
      where: { merchantId },
    });

    return {
      total: subscriptions.length,
      active: subscriptions.filter((s) => s.status === 'active').length,
      mrr: this.calculateMRR(subscriptions),
    };
  }

  async getChurnRiskAnalysis(merchantId: string) {
    const subscriptions = await this.subscriptionRepo.find({
      where: { merchantId },
    });

    // For now, return a simple analysis
    // We'll enhance this with AI predictions later
    return {
      totalSubscriptions: subscriptions.length,
      churnRisk: {
        high: subscriptions.filter((s) => s.status === 'at_risk').length,
        medium: subscriptions.filter(
          (s) =>
            s.status === 'active' && this.isOlderThanMonths(s.createdAt, 6),
        ).length,
        low: subscriptions.filter(
          (s) =>
            s.status === 'active' && !this.isOlderThanMonths(s.createdAt, 6),
        ).length,
      },
    };
  }

  private calculateMRR(subscriptions: Subscription[]) {
    return subscriptions
      .filter((s) => s.status === 'active')
      .reduce((total, sub) => {
        return (
          total + (sub.frequency === 'monthly' ? sub.amount : sub.amount / 12)
        );
      }, 0);
  }

  private isOlderThanMonths(date: Date, months: number): boolean {
    const monthsAgo = new Date();
    monthsAgo.setMonth(monthsAgo.getMonth() - months);
    return date < monthsAgo;
  }
}
