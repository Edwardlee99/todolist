import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';
import { Todolist } from './entities/todolist.entity';

@Injectable()
export class TodolistsService {
  
  constructor(
    @InjectRepository(Todolist)
    private TaskRepository: Repository<Todolist>,
  ) {}
  
  
  async create(createTodolistDto: CreateTodolistDto) {
    return await this.TaskRepository.save(createTodolistDto);
  }

  async findAll() {
    return await this.TaskRepository.find({
      order: {
          status: "ASC"
      },
  });
  }

  async findOne(id: number) {
    return await this.TaskRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTodolistDto: UpdateTodolistDto) {
    const toUpdate = await this.TaskRepository.findOne({ where: { id } });
    const updated = Object.assign(toUpdate, updateTodolistDto);
    return await this.TaskRepository.save(updated);
  }

  async remove(id: number) {
    return await this.TaskRepository.delete(id);
  }
}
