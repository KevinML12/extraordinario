import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const task = this.tasksRepository.create({ ...createTaskDto, userId });
    return this.tasksRepository.save(task);
  }

  findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { userId },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Task> {
    // Usamos findOneBy y lanzamos excepción manualmente si es null
    const task = await this.tasksRepository.findOneBy({ id, userId });
    if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found or unauthorized.`);
    }
    return task;
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): Promise<Task> {
    // El método findOne ya lanza el error si no existe o no pertenece
    const task = await this.findOne(id, userId); 

    // TypeORM update no devuelve la entidad, solo el resultado de la operación
    await this.tasksRepository.update(id, updateTaskDto); 
    
    // Devolvemos el objeto actualizado, TypeORM garantiza que existe aquí.
    const updatedTask = await this.tasksRepository.findOneBy({ id, userId }); 

    // Hacemos un chequeo final de seguridad, aunque findOneBy raramente debería ser null aquí
    if (!updatedTask) {
        throw new NotFoundException(`Task updated but not found (internal error).`);
    }
    return updatedTask;
  }

  // Corregido el tipo de retorno para coincidinr con la implementación
  async remove(id: number, userId: number): Promise<{ affected: number }> {
    const result: DeleteResult = await this.tasksRepository.delete({ id, userId });
    
    // Si affected es 0, lanza la excepción y no llega al return
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found or unauthorized.`);
    }
    
    // Usamos el operador ! para afirmar que 'affected' NO es null/undefined
    return { affected: result.affected! }; 
  }
}