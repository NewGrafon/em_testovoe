import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RabbitmqService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
  exports: [UsersService],
})
export class UsersModule {}
