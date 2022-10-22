import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityRepository } from '../../common/repositories/entity.repository';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private UserRepository: EntityRepository<UserDocument>;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.UserRepository = new EntityRepository<UserDocument>(userModel);
  }

  list() {
    return this.UserRepository.find();
  }

  show(id: string) {
    return this.UserRepository.findById(id).then((user) => {
      if (!user) throw new NotFoundException(`User not found with id '${id}'`);
      return user;
    });
  }

  create(createUserDto: CreateUserDto) {
    return this.UserRepository.create(createUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.UserRepository.findByIdAndUpdate(id, updateUserDto).then(
      (user) => {
        if (!user)
          throw new NotFoundException(`User not found with id '${id}'`);
        return user;
      },
    );
  }

  remove(id: string) {
    return this.UserRepository.findByIdAndDelete(id).then((user) => {
      if (!user) throw new NotFoundException(`User not found with id '${id}'`);
      return user;
    });
  }

  findByEmail(email: string) {
    return this.UserRepository.findOne({ email }).then((user) => {
      if (!user)
        throw new NotFoundException(`User not found with email '${email}'`);
      return user;
    });
  }
}
