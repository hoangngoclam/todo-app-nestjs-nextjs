import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Expose } from 'class-transformer';

export class PageMetaDto {
  @ApiProperty()
  @Expose()
  readonly currentPage: number;

  @ApiProperty()
  @Expose()
  readonly pageCount: number;

  @ApiProperty()
  @Expose()
  readonly limit: number;

  @ApiProperty()
  @Expose()
  readonly itemCount: number;

  @ApiProperty()
  @Expose()
  readonly hasPreviousPage: boolean;

  @ApiProperty()
  @Expose()
  readonly hasNextPage: boolean;

  constructor(currentPage: number, limit: number, itemCount: number) {
    this.currentPage = currentPage;
    this.pageCount = Math.ceil(itemCount / limit);
    this.limit = limit;
    this.itemCount = itemCount;
    this.hasPreviousPage = currentPage > 1;
    this.hasNextPage = this.currentPage < this.pageCount;
  }
}

export class PaginationDto<T> {
  @IsArray()
  @Expose()
  @ApiProperty({ isArray: true })
  readonly items: T[];

  @ApiProperty({ type: () => PageMetaDto })
  @Expose()
  readonly pagination: PageMetaDto;

  constructor(items: T[], pagination: PageMetaDto) {
    (this.items = items), (this.pagination = pagination);
  }
}
