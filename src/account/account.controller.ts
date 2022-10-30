import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IlistQueryOptions, LOGIN_RESULT } from './account.constant';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateAccounttDto } from './dtos/update-account.dto';

// TODO:
// make sure account work
// create relation ship between account and department
// Move ACCOUNT_STATUS to account.constant

@Controller('api/account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  createAccountRoute(@Body() body: CreateAccountDto) {
    return this.accountService.createAcc(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const loginResult = await this.accountService.login(body);
    // For security reason, we will not disclose the reason for failing
    // it also makes less code
    switch (loginResult) {
      case LOGIN_RESULT.INACTIVE:
        throw new HttpException('Account is locked', HttpStatus.UNAUTHORIZED);
      case LOGIN_RESULT.SUCCESS:
        return {
          ok: 1,
        };
      default:
        throw new HttpException(
          'Username or password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  @Get()
  listDepartmentRoute(@Query() queryOptions: IlistQueryOptions) {
    console.log(queryOptions);
    return this.accountService.findMany(queryOptions);
  }

  @Get(':id')
  async findOneDepartmentRoute(@Param('id') id: string) {
    const foundAccount = await this.accountService.findOne(id);
    if (!foundAccount) {
      throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
    }
    return foundAccount;
  }

  @Patch(':id')
  async updateDepartmentRoute(
    @Param('id') id: string,
    @Body() UpdateAccounttDto: UpdateAccounttDto,
  ) {
    const result = await this.accountService.patchAccount(
      id,
      UpdateAccounttDto,
    );
    if (!result) {
      throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
