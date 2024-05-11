import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from '../interfaces/jwt-payLoad';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private jwtService:JwtService,
    private authService:AuthService,
  ){

  }
  
  async canActivate(
    context: ExecutionContext,
  ):  Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if(!token)
      throw new UnauthorizedException('There is no bearer token');
    
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayLoad>(
        token,
        {
          secret: process.env.JWT_SEED
        }
      );
    
      const user = await this.authService.findUserById(payload.id);
      if(!user) throw new UnauthorizedException('User does not exists');
      if(!user.isActive) throw new UnauthorizedException('User is not active');
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['user'] = user;
    }catch(err){
      throw new UnauthorizedException();
    }

    // console.log({token});

    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
