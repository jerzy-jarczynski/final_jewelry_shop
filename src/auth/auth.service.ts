import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDTO } from './dtos/register.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private usersService: UsersService) {}

  public async register(registrationData: RegisterDTO) {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const userData = {
      email: registrationData.email,
      name: registrationData.name,
      address: registrationData.address,
    };

    const createdUser = await this.usersService.create(
      userData,
      hashedPassword,
    );

    const updatedUser = await this.usersService.createCart(createdUser.id);

    this.logger.log(`Created User: ${JSON.stringify(createdUser)}`);

    return updatedUser;
  }
}
