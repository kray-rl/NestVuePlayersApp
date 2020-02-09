import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerModule } from './player/player.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nestTestApp', { useNewUrlParser: true }),
    PlayerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}