// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    // [INTERVIEW] Environment configuration (similar to .NET's appsettings)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // [INTERVIEW] Database configuration (similar to DbContext in EF)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // [INTERVIEW] Explain why false in prod
    }),

    // [INTERVIEW] Message queue for async processing (similar to Azure Service Bus)
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
      },
    }),

    SubscriptionModule,
  ],
})
export class AppModule {}
