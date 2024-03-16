import {
  Body,
  Controller,
  HttpStatus,
  Post,
  ConflictException as ConflictHttpException,
  UsePipes,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { UserAlreadyExistsError } from '@modules/user/domain/errors/user-already-exists.error';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { CreateUserRequest } from '@modules/user/interface/adapters/request/create-user.request';
import { CreateUserCommand } from '@modules/user/application/commands/create-user/create-user.command';
import { match, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ZodValidationPipe } from 'nestjs-zod';

//Users won't be created via this controller, its mainly an example.
@UsePipes(ZodValidationPipe)
@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

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
  @Post(routesV1.user.root)
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
}
