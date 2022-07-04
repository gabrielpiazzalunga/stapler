import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RuleService } from './rule.service ';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, RuleService],
})
export class AppModule {}
