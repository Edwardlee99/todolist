import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodolistsModule } from './todolists/todolists.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'todolist',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
  }), TodolistsModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule { }
