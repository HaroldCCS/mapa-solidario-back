import { PartialType } from '@nestjs/mapped-types';
import { CreateHeadquarterDto } from './create-headquarter.dto';

export class UpdateHeadquarterDto extends PartialType(CreateHeadquarterDto) {}
