import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreatUserDto, UpdateAuthDto, LoginDto, RegisterDto } from './dto/';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() createUserDto: CreatUserDto) {
    return this.authService.create(createUserDto);
  }
  //creamos un login
  @Post('/login')
  login(@Body()loginDto:LoginDto){
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body()registerDto:RegisterDto){
   return this.authService.register(registerDto);
  }

  //request : Solicitud de algo 
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req:Request) {
    const user = req['user'];
    // return user;
    return this.authService.findAll();
  }

  @Get('/checked-token')
  checkToken(){

  }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.authService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
//     return this.authService.update(+id, updateAuthDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.authService.remove(+id);
//   }
}
