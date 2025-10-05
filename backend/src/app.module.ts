import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module'; // <--- Primera importación (Correcta)
import { TasksModule } from './tasks/tasks.module';
import { User } from './auth/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
// NOTA: ELIMINA cualquier otra línea que diga 'import { AuthModule } from...'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Task],
      synchronize: false,
      migrations: [__dirname + '/migrations/**/*.{.ts,.js}'],
      logging: true,
    }),
    AuthModule, // <--- Solo debe aparecer aquí una vez
    TasksModule,
  ],
})
export class AppModule {}