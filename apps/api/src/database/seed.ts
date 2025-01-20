import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Subscription } from '../subscription/entities/subscription.entity';
import {
  SubscriptionStatus,
  RiskFactorType,
} from '../subscription/dto/subscription.dto';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const subscriptionRepo = app.get(getRepositoryToken(Subscription));

  // Clear existing data
  await subscriptionRepo.clear();

  // Create test merchant
  const merchantId = 'test-merchant';

  // Generate test subscriptions
  const subscriptions = [];
  const frequencies = ['monthly', 'yearly'] as const;

  // Active subscriptions
  for (let i = 0; i < 95; i++) {
    subscriptions.push({
      merchantId,
      customerId: `customer-${i}`,
      planId: `plan-${Math.floor(Math.random() * 3) + 1}`,
      status: SubscriptionStatus.ACTIVE,
      frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
      amount: Math.floor(Math.random() * 100) + 20,
      billingCycleCount: Math.floor(Math.random() * 12),
      lastBillingDate: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ),
      nextBillingDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
      ),
      churnRiskScore: Math.random() * 0.3,
      riskFactors: [],
    });
  }

  // At-risk subscriptions
  for (let i = 0; i < 5; i++) {
    subscriptions.push({
      merchantId,
      customerId: `at-risk-customer-${i}`,
      planId: `plan-${Math.floor(Math.random() * 3) + 1}`,
      status: SubscriptionStatus.AT_RISK,
      frequency: frequencies[Math.floor(Math.random() * frequencies.length)],
      amount: Math.floor(Math.random() * 100) + 20,
      billingCycleCount: Math.floor(Math.random() * 12),
      lastBillingDate: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ),
      nextBillingDate: new Date(
        Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
      ),
      churnRiskScore: 0.7 + Math.random() * 0.3,
      riskFactors: [
        {
          type: RiskFactorType.PAYMENT_ISSUES,
          severity: 'high',
          description: 'Multiple failed payments',
        },
        {
          type: RiskFactorType.USAGE_DECLINE,
          severity: 'medium',
          description: 'Significant decrease in usage',
        },
      ],
    });
  }

  // Save all subscriptions
  await subscriptionRepo.save(subscriptions);

  console.log('Database seeded!');
  await app.close();
}

seed().catch(console.error);
