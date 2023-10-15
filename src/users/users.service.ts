import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindFilterDto } from './dto/find-filter.dto';
import { RabbitmqService } from '../rabbitmq/rabbitmq.service';
import { LOGGING_QUEUE } from '../consts/rabbitmq.const';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private rmqService: RabbitmqService,
  ) {}
  getAll() {
    return this.repository.find();
  }

  async findByFilter(filter: FindFilterDto) {
    filter = new FindFilterDto(filter);
    const users: UserEntity[] = await this.repository
      .createQueryBuilder('users')
      .where('users.age >= :age', {
        age: filter.age,
      })
      .offset(filter.offset)
      .take(filter.limit)
      .getMany();

    const cities = {};
    users.forEach((user) => {
      if (cities[user.city]) {
        cities[user.city].push(user.name);
      } else {
        cities[user.city] = [user.name];
      }
    });
    for (const city in cities) {
      if (cities[city].length === 1) {
        cities[city] = cities[city][0];
      }
    }

    return {
      users: users.map((user) => {
        return { name: user.name, surname: user.surname, age: user.age };
      }),
      cities,
    };
  }

  editPage() {
    return { title: 'Edit page' };
  }

  create(createUserDto: CreateUserDto) {
    return this.repository.save(createUserDto).then(() => {
      createUserDto['updatedAt'] = new Date().toISOString();
      this.rmqService.RMQ_SendMessage(LOGGING_QUEUE, createUserDto);
    });
  }

  async update(updateUserDto: UpdateUserDto) {
    const userId: number = (
      await this.repository.findOneBy({
        name: updateUserDto.currentName,
        surname: updateUserDto.currentSurname,
        city: updateUserDto.currentCity,
        age: updateUserDto.currentAge,
      })
    )?.id;

    if (userId) {
      return await this.repository
        .update(
          {
            id: userId,
          },
          new CreateUserDto(updateUserDto),
        )
        .then(() => {
          updateUserDto['id'] = userId;
          updateUserDto['updatedAt'] = new Date().toISOString();
          this.rmqService.RMQ_SendMessage(LOGGING_QUEUE, updateUserDto);
        });
    }

    return null;
  }
}
