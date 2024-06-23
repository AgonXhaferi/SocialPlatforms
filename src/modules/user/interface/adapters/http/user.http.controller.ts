import {
  Body,
  ConflictException as ConflictHttpException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { UserAlreadyExistsError } from '@modules/user/domain/errors/user-already-exists.error';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { CreateUserRequest } from '@modules/user/interface/adapters/request/create-user.request';
import { CreateUserCommand } from '@modules/user/application/commands/create-user.command';
import { match, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateUserFollowingRequest } from '@modules/user/interface/adapters/request/create-user-following.request';
import { CreateUserFollowingCommand } from '@modules/user/application/commands/create-user-following.command';
import { ExceptionBase } from '@libs/exceptions';
import { CultureResponse } from '@modules/culture/interface/response/culture.response';
import { FindPrimaryCultureUsersQuery } from '@modules/culture/application/queries/find-primary-culture-users.query';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';

//Users WON'T be created via this controller, it's mainly an example.
@UsePipes(ZodValidationPipe)
@Controller({
  version: routesV1.version,
  path: routesV1.user.root,
})
export class UserHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('/:primaryCulture')
  async getUsersByPrimaryCulture(
    @Param('primaryCulture') primaryCulture: string,
  ) {
    const query = new FindPrimaryCultureUsersQuery({
      primaryCultureName: primaryCulture,
    });

    const result: Result<string[], Error> = await this.queryBus.execute(query);

    if (
      result.isErr() &&
      result.unwrapErr() instanceof CultureDoesntExistsError
    ) {
      throw new NotFoundException();
    }
  }

  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post()
  async create(@Body() body: CreateUserRequest): Promise<IdResponse> {
    const command = new CreateUserCommand({
      name: body.name,
      lastName: body.lastName,
      email: body.email,
      id: body.id,
      street: body.street,
      country: body.country,
      culture: body.culture,
      userName: body.userName,
      age: body.age,
      postalCode: body.postalCode,
    });

    const result: Result<AggregateID, UserAlreadyExistsError> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof UserAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }

  @ApiOperation({ summary: 'Create user following.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: UserAlreadyExistsError.message, //Change this.
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.user.following)
  async createUserFollowing(
    @Body() body: CreateUserFollowingRequest,
  ): Promise<IdResponse> {
    const command = new CreateUserFollowingCommand({
      followerId: body.followerId,
      followeeId: body.followeeId,
    });

    const result: Result<AggregateID, ExceptionBase> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof ExceptionBase)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }
}
