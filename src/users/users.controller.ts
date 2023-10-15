import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  Res,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindFilterDto } from './dto/find-filter.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    await this.usersService.create(createUserDto);
    return res.redirect('/');
  }

  @Get('/')
  getAll() {
    return this.usersService.getAll();
  }

  @Get('/filter')
  async findByFilter(@Query() filterQuery: FindFilterDto) {
    return this.usersService.findByFilter(filterQuery);
  }

  @Get('/edit')
  @Render('edit')
  editPage() {
    return this.usersService.editPage();
  }

  @Post('/edit')
  async update(@Body() updateUserDto: UpdateUserDto, @Res() res) {
    await this.usersService.update(new UpdateUserDto(updateUserDto));
    return res.redirect('/');
  }
}
