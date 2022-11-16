import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const GetUser = createParamDecorator( ( data, ctx: ExecutionContext, ) => {
    const req = ctx.switchToHttp().getRequest();
    const usuario = req.user;
    if ( !usuario ) {
        throw new InternalServerErrorException('Usuario no existente.');   
    }
    return usuario;
}  );
