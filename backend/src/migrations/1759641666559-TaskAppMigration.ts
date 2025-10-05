import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

// ASEGÚRATE DE USAR EL NOMBRE DE CLASE Y EL TIMESTAMP GENERADO
export class TaskAppMigration1759641666559 implements MigrationInterface { 

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Tabla User
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Tabla Task
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'done',
            type: 'boolean',
            default: false,
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    // Clave Foránea
    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Buscar la tabla 'tasks'
    const table = await queryRunner.getTable('tasks');
    
    // VERIFICACIÓN CLAVE: Solo proceder si la tabla existe
    if (table) {
        // Eliminar la clave foránea
        const foreignKey = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('user_id') !== -1,
        );
        
        // Verificar si la clave existe antes de intentar eliminarla
        if (foreignKey) {
            await queryRunner.dropForeignKey('tasks', foreignKey);
        }
    }
    
    // Eliminar tablas
    await queryRunner.dropTable('tasks');
    await queryRunner.dropTable('users');
  }
}