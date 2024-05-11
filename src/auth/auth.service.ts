import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcryptjs from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from './interfaces/jwt-payLoad';
import { LoginResponse } from './interfaces/login-response';
import { RegisterDto, UpdateAuthDto, CreatUserDto, LoginDto } from './dto/';


@Injectable()
export class AuthService {

  //lo mismo que en angular para usar el httpclient por ej
  constructor(
    @InjectModel(User.name,)
    private userModel:Model<User>,
    private jwtService: JwtService,) {
    
  }





  async create(createUserDto: CreatUserDto):Promise<User> {
    
  //sabemos que en el createUser tenemos la data del usuario
  
  try{
    // Pasos a tener en cuenta : 
    
    // 1- Encriptar la contraseña

    //Desestructuramos
    const {password, ...userData } = createUserDto;
     const newUser = new this.userModel({
      password: bcryptjs.hashSync(password,10),
      ...userData
     });
     await newUser.save();
     const {password:_,...user} = newUser.toJSON();
     return user;

     }
    
    // 2- Guardar el usuario
    
    // 3- Generar el JWT
    
    

   catch(error) {
    console.log(error.code);
  if(error.code === 11000){
    throw new BadRequestException(`${createUserDto.email} already exists!`)
  }
  throw new InternalServerErrorException('Something terrible happen!')
  }




  }

  async register(registerDto:RegisterDto):Promise<LoginResponse>{
     
    
      const user = await this.create(registerDto);
      // const user = await this.create({email: registerDto.email, name: registerDto.name, password:registerDto.password});
      

     return {
      user:user,
      token: this.getJwt({id:user._id})
     }

    }



  async login(loginDto:LoginDto):Promise<LoginResponse>{
    

    const {email, password} = loginDto;
//para la ejecucion del codigo hasta que resuelva esto
    const user = await this.userModel.findOne({email:email});
    console.log(user);
    
    if(!user)
      throw new UnauthorizedException('No valid credentials - email')
    if(!bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException('Not valid password')
    }

    const {password:_,...rest} = user.toJSON();

     return {
      user: rest,
      token: this.getJwt({id:user.id})
     }
    //debe regresar el User y token de acceso
    //el token de acceso debe ser un JWT(3jjjasjd.ajsdjas.12sdfs)
    //User {_id, name, email, roles}
    
  }

  findAll(): Promise<User[]> {
    //Regresar todos los usuarios
    return this.userModel.find();
  }

 async findUserById(id:string){
    const user = await this.userModel.findById(id);
    console.log('finduserbyid: ',user);
    const { password, ...rest } = user.toJSON();
    return rest;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
//Para usar jwt
  getJwt(payLoad:JwtPayLoad){
    const token = this.jwtService.sign(payLoad);
    return token;
  }

}
