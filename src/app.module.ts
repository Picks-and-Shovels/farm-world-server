import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { FarmModule } from './farm/farm.module';

@Module({
  imports: [DatabaseModule, UserModule, FarmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
