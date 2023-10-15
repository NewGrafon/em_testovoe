export class CreateUserDto {
  constructor(obj: any) {
    if (obj === false) return;
    this.name = obj.name;
    this.surname = obj.surname;
    this.city = obj.city;
    this.age = Number(obj.age);
  }

  name: string;
  surname: string;
  city: string;
  age: number;
}
