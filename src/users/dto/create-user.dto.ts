export class CreateUserDto {
  constructor(obj: any) {
    this.name = obj.name || obj.currentName;
    this.surname = obj.name || obj.currentSurname;
    this.city = obj.name || obj.currentCity;
    this.age = Number(obj.name || obj.currentAge);
  }

  name: string;
  surname: string;
  city: string;
  age: number;
}
