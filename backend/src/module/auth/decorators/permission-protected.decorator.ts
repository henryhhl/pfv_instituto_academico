import { SetMetadata } from '@nestjs/common';
import { ValidPermission } from '../interfaces/valid-permission';

export const PermissionProtected = ( ...args: ValidPermission[] ) => {
    return SetMetadata('permission-protected', args);
};
