import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Todolist } from './entities/todolist.entity';
import { TodolistsService } from './todolists.service';
import { TodolistsController } from './todolists.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todolist])],
  controllers: [TodolistsController],
  providers: [TodolistsService],
})
export class TodolistsModule {}
