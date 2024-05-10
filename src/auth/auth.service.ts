import { LoginDto } from './dto/login.dto';
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreatUserDto } from './dto/create-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import * as bcryptjs from "bcryptjs";


@Injectable()
export class AuthService {

  
  constructor(
    @InjectModel(User.name,)
    private userModel:Model<User>) {
    
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

  async login(loginDto:LoginDto){
    

    const {email, password} = loginDto;
//para la ejecucion del codigo hasta que resuelva esto
    const user = await this.userModel.findOne({email:email});
    if(!user)
      throw new UnauthorizedException('No valid credentials - email')
    if(!bcryptjs.compareSync(password, user.password)){
      throw new UnauthorizedException('Not valid password')
    }

    const {password:_,...rest} = user.toJSON();

     return {
      ...rest,
      token:'ABC-123'
     }
    //debe regresar el User y token de acceso
    //el token de acceso debe ser un JWT(3jjjasjd.ajsdjas.12sdfs)
    //User {_id, name, email, roles}
    
  }

  findAll() {
    return `This action returns all auth`;
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
}
