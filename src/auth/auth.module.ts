import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [ 
    //agregamos esto por la configuracion de los env
    ConfigModule.forRoot(),
    // esto es de mongo
    MongooseModule.forFeature([
      {
        name:User.name,
        schema: UserSchema,
      }
    ]),
    //agregamos para que pueda leer las firma
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
  ]
})
export class AuthModule {}
