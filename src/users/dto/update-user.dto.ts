import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { parseNumberOrNull } from '../../functions/parse';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  constructor(obj: any) {
    super(false);

    this.currentName = obj.currentName;
    this.currentSurname = obj.currentSurname;
    this.currentCity = obj.currentCity;
    this.currentAge = Number(obj.currentAge);

    this.name =
      obj.name.trim().length === 0 ? this.currentName : obj.name.trim();
    this.surname =
      obj.surname.trim().length === 0 ? this.surname : obj.surname.trim();
    this.city = obj.city.trim().length === 0 ? this.city : obj.city.trim();
    this.age = parseNumberOrNull(obj.age) ?? obj.currentAge;
  }

  currentName: string;
  currentSurname: string;
  currentCity: string;
  currentAge: number;
}
