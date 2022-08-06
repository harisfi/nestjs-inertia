import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { InertiaMiddleware } from '../../src';

@Module({
  imports: [],
  providers: [InertiaMiddleware],
  controllers: [TestController],
})
export class TestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(InertiaMiddleware).forRoutes('*');
  }
}