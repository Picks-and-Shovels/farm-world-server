import { AbstractConfigService, OptionalBoolean } from '@nestjs-library/config';
import { Injectable } from '@nestjs/common';
import { Expose, Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

@Injectable()
export class TypeORMConfigService
  extends AbstractConfigService<TypeORMConfigService>
  implements MysqlConnectionOptions
{
  type = 'mysql' as const;

  @Expose({ name: 'DATABASE_NAME' })
  @Transform(({ value }) => value ?? 'farmworld')
  @IsString()
  @IsNotEmpty()
  database: string;

  @Expose({ name: 'DATABASE_HOST' })
  @Transform(({ value }) => value ?? '172.22.240.3')
  @IsString()
  @IsNotEmpty()
  host: string;

  @Expose({ name: 'DATABASE_PORT' })
  @Type(() => Number)
  @Transform(({ value }) => value ?? 3306)
  @IsPositive()
  port: number;

  @Expose({ name: 'DATABASE_USERNAME' })
  @Transform(({ value }) => value ?? 'root')
  @IsString()
  @IsNotEmpty()
  username: string;

  @Expose({ name: 'DATABASE_PASSWORD' })
  @Transform(({ value }) => value ?? 'farmworld123!@#')
  @IsString()
  @IsNotEmpty()
  password: string;

  @Expose({ name: 'DATABASE_AUTOLOAD_ENTITIES' })
  @Transform(({ value }) => OptionalBoolean(value) ?? true)
  @IsBoolean()
  @IsNotEmpty()
  autoLoadEntities: boolean;

  @Expose({ name: 'DATABASE_KEEP_CONNECTION_ALIVE' })
  @Transform(({ value }) => OptionalBoolean(value) ?? true)
  @IsBoolean()
  @IsNotEmpty()
  keepConnectionAlive: boolean;

  @Expose({ name: 'DATABASE_SYNCHRONIZE' })
  @Transform(({ value }) => OptionalBoolean(value) ?? true)
  @IsBoolean()
  @IsNotEmpty()
  synchronize: boolean;
}
