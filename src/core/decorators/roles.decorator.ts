import { SetMetadata } from '@nestjs/common';
import { DecoratorConstant } from '../constants/decorator.constant';
import { Role } from '../enums/app-role.enum';

export const HasRoles = (roles: Role[]) => SetMetadata(DecoratorConstant.HAS_ROLES, roles);
