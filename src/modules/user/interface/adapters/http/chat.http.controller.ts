import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { routesV1 } from '@config/app.routes';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { UserAlreadyExistsError } from '@modules/user/domain/errors/user-already-exists.error';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { match, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { ConflictException as ConflictHttpException } from '@nestjs/common/exceptions/conflict.exception';
import { CreateUserChatRequest } from '@modules/user/interface/adapters/request/create-user-chat.request';
import { CreateUserChatCommand } from '@modules/user/application/commands/create-user-chat.command';
import { ExceptionBase } from '@libs/exceptions';

@UsePipes(ZodValidationPipe)
@Controller({
  version: routesV1.version,
  path: routesV1.chat.root,
})
export class ChatHttpController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create a chat' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post()
  async create(@Body() body: CreateUserChatRequest): Promise<IdResponse> {
    const command = new CreateUserChatCommand({
      userOneId: body.userOneId,
      userTwoId: body.userTwoId,
    });

    const result: Result<AggregateID, ExceptionBase> =
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
