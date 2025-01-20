// subscription.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('merchant/:merchantId/metrics')
  @ApiOperation({ summary: 'Get subscription metrics for a merchant' })
  async getSubscriptionMetrics(@Param('merchantId') merchantId: string) {
    return this.subscriptionService.getSubscriptionMetrics(merchantId);
  }

  @Get('merchant/:merchantId/churn-risk')
  @ApiOperation({
    summary: 'Get churn risk analysis for merchant subscriptions',
  })
  async getChurnRiskAnalysis(@Param('merchantId') merchantId: string) {
    return this.subscriptionService.getChurnRiskAnalysis(merchantId);
  }
}
