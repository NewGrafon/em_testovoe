import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  currentName: string;
  currentSurname: string;
  currentCity: string;
  currentAge: number;
}
