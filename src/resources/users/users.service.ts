import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityRepository } from '../../common/repositories/entity.repository';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  private userRepository: EntityRepository<UserDocument>;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.userRepository = new EntityRepository<UserDocument>(userModel);
  }

  list() {
    return this.userRepository.find();
  }

  show(id: string) {
    return this.userRepository.findById(id).then((user) => {
      if (!user) throw new NotFoundException(`User not found with id '${id}'`);
      return user;
    });
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository
      .findByIdAndUpdate(id, updateUserDto)
      .then((user) => {
        if (!user)
          throw new NotFoundException(`User not found with id '${id}'`);
        return user;
      });
  }

  remove(id: string) {
    return this.userRepository.findByIdAndDelete(id).then((user) => {
      if (!user) throw new NotFoundException(`User not found with id '${id}'`);
      return user;
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email }).then((user) => {
      if (!user)
        throw new NotFoundException(`User not found with email '${email}'`);
      return user;
    });
  }
}
