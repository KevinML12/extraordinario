import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Task } from './entities/task.entity';
import { AuthRequest } from '../auth/interfaces/auth-request.interface'; // NUEVA IMPORTACIÓN

// Aplica el guard a todas las rutas de este controlador
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: AuthRequest): Promise<Task> {
    const userId = req.user.id;
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@Req() req: AuthRequest): Promise<Task[]> {
    const userId = req.user.id;
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @Req() req: AuthRequest): Promise<Task> {
    const userId = req.user.id;
    return this.tasksService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: AuthRequest,
  ): Promise<Task> {
    const userId = req.user.id;
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthRequest,
  ): Promise<{ affected?: number }> {
    const userId = req.user.id;
    return this.tasksService.remove(id, userId);
  }
}