import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as uniqueValidator from 'mongoose-unique-validator';
import { User, UserSchema } from './schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre<User>('save', async function () {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
          });

          schema.pre('findOneAndUpdate', async function () {
            const user = this.cast(this.model, this.getUpdate());
            if (user.password) {
              const salt = await bcrypt.genSalt(10);
              const hash = await bcrypt.hash(user.password, salt);
              user.password = hash;
              this.setUpdate(user);
            }
          });

          schema.plugin(uniqueValidator, {
            message: 'Expected to be unique.',
          });

          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
