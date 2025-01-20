import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionStatus } from './dto/subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async findByMerchant(merchantId: string): Promise<Subscription[]> {
    return this.subscriptionRepository.find({
      where: { merchantId },
    });
  }

  async getSubscriptionMetrics(merchantId: string) {
    const subscriptions = await this.subscriptionRepository.find({
      where: { merchantId },
    });

    const totalSubscriptions = subscriptions.length;
    const activeSubscriptions = subscriptions.filter(
      (s) => s.status === SubscriptionStatus.ACTIVE,
    ).length;

    const statusCounts = {
      active: subscriptions.filter(
        (s) => s.status === SubscriptionStatus.ACTIVE,
      ).length,
      paused: subscriptions.filter(
        (s) => s.status === SubscriptionStatus.PAUSED,
      ).length,
      cancelled: subscriptions.filter(
        (s) => s.status === SubscriptionStatus.CANCELLED,
      ).length,
      high_risk: subscriptions.filter(
        (s) => s.status === SubscriptionStatus.AT_RISK,
      ).length,
    };

    const churnRate =
      totalSubscriptions > 0
        ? (statusCounts.cancelled / totalSubscriptions) * 100
        : 0;

    const mrr = subscriptions.reduce((total, sub) => {
      return (
        total + (sub.frequency === 'monthly' ? sub.amount : sub.amount / 12)
      );
    }, 0);

    return {
      totalSubscriptions,
      activeSubscriptions,
      statusCounts,
      churnRate,
      mrr,
    };
  }

  async getChurnRiskAnalysis(merchantId: string) {
    const subscriptions = await this.subscriptionRepository.find({
      where: { merchantId },
      order: { churnRiskScore: 'DESC' },
    });

    const atRiskCount = subscriptions.filter(
      (s) => s.churnRiskScore > 0.7,
    ).length;
    const moderateRiskCount = subscriptions.filter(
      (s) => s.churnRiskScore > 0.4 && s.churnRiskScore <= 0.7,
    ).length;

    const riskDistribution = {
      high_risk: atRiskCount,
      moderate_risk: moderateRiskCount,
      healthy: subscriptions.length - (atRiskCount + moderateRiskCount),
    };

    const topRiskFactors = this.analyzeCommonRiskFactors(subscriptions);

    return {
      riskDistribution,
      topRiskFactors,
      atRiskSubscriptions: subscriptions
        .filter((s) => s.churnRiskScore > 0.7)
        .map((s) => ({
          id: s.id,
          customerId: s.customerId,
          riskScore: s.churnRiskScore,
          riskFactors: s.riskFactors,
        })),
    };
  }

  private analyzeCommonRiskFactors(subscriptions: Subscription[]) {
    const allRiskFactors = subscriptions
      .filter((s) => s.riskFactors && s.riskFactors.length > 0)
      .flatMap((s) => s.riskFactors);

    const factorCounts = allRiskFactors.reduce(
      (acc, factor) => {
        acc[factor.type] = (acc[factor.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(factorCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([type, count]) => ({
        type,
        count,
        percentage: (count / subscriptions.length) * 100,
      }));
  }
}
