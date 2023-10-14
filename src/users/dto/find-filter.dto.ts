import { parseNumberOrNull } from '../../functions/parse';

export class FindFilterDto {
  constructor(filter: FindFilterDto) {
    this.limit = parseNumberOrNull(filter.limit) ?? 15;
    this.offset = parseNumberOrNull(filter.offset) ?? 0;
    this.age = parseNumberOrNull(filter.age) ?? 18;
  }

  limit: number;
  offset: number;
  age: number;
}
