export enum SubscriptionStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  PAST_DUE = 'past_due',
  AT_RISK = 'at_risk',
}

export enum RiskFactorType {
  PAYMENT_ISSUES = 'payment_issues',
  USAGE_DECLINE = 'usage_decline',
  SUPPORT_TICKETS = 'support_tickets',
  PRICE_SENSITIVITY = 'price_sensitivity',
}

export interface RiskFactor {
  type: RiskFactorType;
  severity: 'low' | 'medium' | 'high';
  description: string;
}

export class CreateSubscriptionDto {
  customerId: string;
  planId: string;
  monthlyValue: number;
  status: SubscriptionStatus;
}

export class UpdateSubscriptionDto {
  status?: SubscriptionStatus;
  monthlyValue?: number;
  nextBillingDate?: Date;
}
