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
import { IlistQueryOptions } from './account.constant';
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

  // @Post()
  // login(@Body() body: LoginDto) {
  //   return this.accountService.login(body);
  // }

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
