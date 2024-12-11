import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe, NotFoundException } from '@nestjs/common';
import { TodolistsService } from './todolists.service';
import { CreateTodolistDto } from './dto/create-todolist.dto';
import { UpdateTodolistDto } from './dto/update-todolist.dto';

@Controller('todolists')
export class TodolistsController {
  constructor(private readonly todolistsService: TodolistsService) {}

  @Post()
  create(@Body(ValidationPipe) createTodolistDto: CreateTodolistDto) {
    return this.todolistsService.create(createTodolistDto);
  }

  @Get()
  findAll() {
    const result = this.todolistsService.findAll();

    if (!result) {
      throw new NotFoundException('Result is not found');
    }
  
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    const result = this.todolistsService.findOne(+id);

    if (!result) {
      throw new NotFoundException('Todo list with ID' + +id + ' not found');
    }
  
    return result;
  }

  @Put(':id')
  update(@Param('id', ValidationPipe) id: number, @Body() updateTodolistDto: UpdateTodolistDto) {
    return this.todolistsService.update(+id, updateTodolistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todolistsService.remove(+id);
  }
}
