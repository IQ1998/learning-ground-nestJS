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
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { cookieKey, IlistQueryOptions, LOGIN_RESULT } from './account.constant';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dtos/create-account.dto';
import { LoginDto } from './dtos/login.dto';
import { UpdateAccounttDto } from './dtos/update-account.dto';
import appSession from '../non-modules/helper/session';
import { CustomRequest } from '../non-modules/typing/class.typing';

@Controller('api/account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  createAccountRoute(@Body() body: CreateAccountDto) {
    return this.accountService.createAcc(body);
  }

  // TODO: finish cookie flow

  @Post('/login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const loginResult = await this.accountService.login(body);
    // For security reason, we will not disclose the reason for failing
    // it also makes less code
    switch (loginResult.result) {
      case LOGIN_RESULT.INACTIVE:
        throw new HttpException('Account is locked', HttpStatus.UNAUTHORIZED);
      case LOGIN_RESULT.SUCCESS:
        const { key, payload } = loginResult.sessionInfo;
        appSession.setSession(key, payload);
        res.cookie(cookieKey, key, {
          // ENV
          // expires: new Date(Date.now() + appConfigs.sessionExpire),
          expires: new Date(Date.now() + 30000),
          // Client cannot access cookie through client side script
          httpOnly: true,
        });
        return res.status(200).json({
          ok: 1,
        });
      default:
        throw new HttpException(
          'Username or password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
    }
  }

  @Get()
  listDepartmentRoute(@Query() queryOptions: IlistQueryOptions) {
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
    @Request() req: CustomRequest,
  ) {
    const result = await this.accountService.patchAccount(
      id,
      UpdateAccounttDto,
    );
    if (!result) {
      throw new HttpException('Account does not exist', HttpStatus.NOT_FOUND);
    }
    return {
      ...result,
      justUpdatedBy: req.session.fullName + ' HAHAHAHAHAHAHAHA',
    };
  }
}
