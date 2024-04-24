import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/models/todo.model';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private readonly todoModel: Model<TodoDocument>) {}

  async create(createTodoDto: Todo): Promise<Todo> {
    try {
      const createdTodo = new this.todoModel(createTodoDto);
      return await createdTodo.save();
    } catch (error) {
      if (error.name === 'ValidationError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<Todo[]> {
    try {
      return this.todoModel.find().exec();
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<Todo> {
    try {
      const todo = await this.todoModel.findById(id).exec();
      if (!todo) throw new HttpException('Todo not found!', HttpStatus.NOT_FOUND);
      return todo;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, updateTodoDto: Todo): Promise<Todo> {
    try {
      const updatedTodo = await this.todoModel.findOneAndUpdate({ _id: id }, updateTodoDto, { new: true }).exec();
      if (!updatedTodo) throw new HttpException('Todo not found!', HttpStatus.NOT_FOUND);
      return updatedTodo;
    } catch (error) {
      if (error.name === 'ValidationError') throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string): Promise<Todo> {
    try {
      const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
      if (!deletedTodo) throw new HttpException('Todo not found!', HttpStatus.NOT_FOUND);
      return deletedTodo;
    } catch (error) {
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
