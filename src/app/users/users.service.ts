import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RolService } from '../rol/rol.service';
import { CacheService } from '../services/cache/cache.service';
import { NotificationService } from '../notification/notification.service';

const names_traduction = {
  name: 'nombre',
  cell_phone: 'celular',
  password: 'contraseña',
  rol: 'rol',
  status: 'estado',
  nit: 'nit',
  address: 'direccion',
  user_validated: 'validacion',
  user_validated_reason: 'motivo validacion',
}

@Injectable()
export class UsersService {
  static cache_keys = {
    find_all: 'find-all-users',
  }

  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private rolService: RolService,
    private cacheService: CacheService,
    private notificationService: NotificationService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    console.log('createUserDto', createUserDto);

    if (!createUserDto.email) throw new BadRequestException('email-required', 'Correo obligatorio');
    if (!createUserDto.name) throw new BadRequestException('name-required', 'Nombre obligatoria');

    const user_repeat_email = await this.UserModel.findOne({email: createUserDto.email});
    if (user_repeat_email?._id) throw new BadRequestException('email-already-exists', 'El correo ya se encuentra registrado');

    const last_user = await this.UserModel.find().sort({ incremental: -1 }).limit(1).select('incremental').exec();

    const incremental = last_user?.[0]?.incremental ? last_user?.[0]?.incremental + 1 : 1;

    const [password, rol] = await Promise.all([
      bcrypt.hash(createUserDto?.password || createUserDto.email, 8),
      (async () => {
        try {
          const rol = await this.rolService.findOneByName(createUserDto?.rol)
          if (rol) return rol;
        } catch (error) {
          const rol = await this.rolService.findOne(createUserDto?.rol);
          return rol;
        }
      })()
    ]);


    createUserDto.rol = rol?._id;
    createUserDto.password = password;
    createUserDto.incremental = incremental;

    const createUser = new this.UserModel(createUserDto);

    const create = await createUser.save();
    await this.cacheService.deleteCacheKey(UsersService.cache_keys.find_all);
    return create
  }

  async findAll() {
    return this.UserModel.find().select('-password').exec();
  }

  async findOne(_params: { _id?: string, email?: string }) {
    const user = await this.UserModel.findOne(_params).exec();

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.UserModel.findById(id).exec();
    if (!updatedUser?._id) return 'not found';

    if (updateUserDto.password === '') {
      delete updateUserDto.password
    }

    if (updateUserDto.password) {
      const password = await bcrypt.hash(updateUserDto.password, 8);
      updateUserDto.password = password;
    }

    //Validar que datos han cambiado
    const propertiesChanged = [];
    for (const key of Object.keys(updateUserDto)) {
      if (!updateUserDto[key] || (updateUserDto[key] === updatedUser[key])) {
        delete updateUserDto[key];
        continue;
      }
      if (key === '_id') continue;
      if (key === 'rol') continue;
      propertiesChanged.push(key);
    }

    const update = await this.UserModel.findOneAndUpdate({ _id: id }, { $set: updateUserDto }, { new: true });

    await Promise.all([
    this.cacheService.deleteCacheKey(UsersService.cache_keys.find_all),
    this.notificationService.create({
      user: id,
      name: 'Su usuario ha sido actualizado',
      description: `Se actualizó la siguiente información: ${propertiesChanged.map(key => `${names_traduction[key]}`).join(', ')}`,
    })]);

    return update;
  }

  async userValidartion(id: string, data: {status: 'approved' | 'rejected', reason: string}) {
    const user = this.update(id, {user_validated: data.status, user_validated_reason: data.reason});
    if (typeof user == 'string') return user;

    const names = {
      approved: 'aprobado',
      rejected: 'rechazado',
    }
    await this.notificationService.create({
      user: id,
      name: 'Se ha validado el estado de su usuario',
      description: `Su usuario ha sido ${names[data.status]} ${data?.reason ? `por la razón: ${data.reason}` : ''}`,
    });
    
    return user;
  }


  public async getUsersByRol(rol: string) {
    const rol_dat = await this.rolService.findAll({ name : rol });
    const users = await this.UserModel.find({ rol: rol_dat[0]._id }).exec();
    return users;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
