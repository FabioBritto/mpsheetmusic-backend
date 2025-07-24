import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InstrumentationModule } from './modules/catalog/infrastructure/instrumentation.module';
import { InstrumentModule } from './modules/catalog/infrastructure/instrument.module';
import { SheetMusicModule } from './modules/catalog/infrastructure/sheetmusic.module';

@Module({
  imports: [InstrumentationModule, InstrumentModule, SheetMusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
