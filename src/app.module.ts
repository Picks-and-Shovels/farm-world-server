import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { FarmModule } from './farm/farm.module';
import { BoardsModule } from './boards/boards.module';
import { CommentsModule } from './comments/comments.module';
import { TagModule } from './tag/tag.module';
import { ConfigModule } from '@nestjs/config';
import { JournalModule } from './journal/journal.module';
import { AuthModule } from './auth/auth.module';
import * as session from 'express-session';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UserModule,
    FarmModule,
    BoardsModule,
    CommentsModule,
    TagModule,
    JournalModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(session({
        secret : 'my-secret',
        resave : false,
        saveUninitialized : false,
        cookie:{
          secrue : false,
          maxAge : 1000*60*30
        },
      }))
      .forRoutes('*');
  }

}
