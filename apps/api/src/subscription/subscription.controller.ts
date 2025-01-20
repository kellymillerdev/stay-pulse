import { Controller, Get, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';

@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('metrics/:merchantId')
  async getMetrics(@Param('merchantId') merchantId: string) {
    return this.subscriptionService.getSubscriptionMetrics(merchantId);
  }

  @Get('churn-analysis/:merchantId')
  async getChurnAnalysis(@Param('merchantId') merchantId: string) {
    return this.subscriptionService.getChurnRiskAnalysis(merchantId);
  }

  @Get(':merchantId')
  async findByMerchant(@Param('merchantId') merchantId: string) {
    return this.subscriptionService.findByMerchant(merchantId);
  }
}
