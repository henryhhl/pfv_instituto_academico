import { AuthGuard } from '@nestjs/passport';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidPermission } from '../interfaces/valid-permission';
import { UserPermissionGuard } from '../guards/user-permission.guard';
import { PermissionProtected } from './permission-protected.decorator';

export function Auth( ...permission: ValidPermission[] ) {
    return applyDecorators(
        PermissionProtected( ...permission ),
        UseGuards( AuthGuard(), UserPermissionGuard ),
    );
}
