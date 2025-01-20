import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '../entities/subscription.entity';
import {
  SubscriptionStatus,
  RiskFactor,
  RiskFactorType,
} from '../dto/subscription.dto';

@Injectable()
export class SubscriptionMonitorService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async analyzeChurnRisk(subscriptionId: string): Promise<number> {
    const subscription = await this.subscriptionRepository.findOneBy({
      id: subscriptionId,
    });
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const riskFactors: RiskFactor[] = [];
    let totalRiskScore = 0;

    // Analyze payment history
    if (subscription.status === SubscriptionStatus.PAST_DUE) {
      riskFactors.push({
        type: RiskFactorType.PAYMENT_ISSUES,
        severity: 'high',
        description: 'Customer has missed recent payments',
      });
      totalRiskScore += 0.4;
    }

    // Analyze subscription age and billing cycles
    if (subscription.billingCycleCount < 3) {
      riskFactors.push({
        type: RiskFactorType.USAGE_DECLINE,
        severity: 'medium',
        description: 'New subscription - higher churn risk in early months',
      });
      totalRiskScore += 0.2;
    }

    // Calculate final risk score (0-1 scale)
    const riskScore = Math.min(totalRiskScore, 1);

    // Update subscription with new risk assessment
    await this.subscriptionRepository.update(subscriptionId, {
      churnRiskScore: riskScore,
      riskFactors,
    });

    return riskScore;
  }

  async getRecommendations(subscriptionId: string): Promise<string[]> {
    const subscription = await this.subscriptionRepository.findOneBy({
      id: subscriptionId,
    });
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const recommendations: string[] = [];

    if (subscription.churnRiskScore > 0.7) {
      recommendations.push('High risk customer - Consider immediate outreach');
      recommendations.push('Offer personalized retention discount');
    } else if (subscription.churnRiskScore > 0.4) {
      recommendations.push(
        'Monitor closely - Schedule customer success check-in',
      );
      recommendations.push('Review product usage patterns');
    }

    return recommendations;
  }

  async generateHealthReport(subscriptionId: string) {
    const subscription = await this.subscriptionRepository.findOneBy({
      id: subscriptionId,
    });
    if (!subscription) {
      throw new Error('Subscription not found');
    }

    const recommendations = await this.getRecommendations(subscriptionId);

    return {
      subscriptionId: subscription.id,
      customerId: subscription.customerId,
      status: subscription.status,
      riskScore: subscription.churnRiskScore,
      riskFactors: subscription.riskFactors,
      recommendations,
      generatedAt: new Date(),
    };
  }
}
