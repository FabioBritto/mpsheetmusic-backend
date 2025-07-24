import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstrumentationModule } from './modules/catalog/infrastructure/instrumentation.module';

@Module({
  imports: [InstrumentationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
