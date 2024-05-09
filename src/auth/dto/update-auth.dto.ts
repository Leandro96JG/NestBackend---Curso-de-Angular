import { PartialType } from '@nestjs/mapped-types';
import { CreatUserDto } from './create-user.dto';

export class UpdateAuthDto extends PartialType(CreatUserDto) {}
