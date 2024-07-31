import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { routesV1 } from '@config/app.routes';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { match, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { CreateUserChatRequest } from '@modules/user/interface/adapters/request/create-user-chat.request';
import { CreateUserChatCommand } from '@modules/user/application/commands/create-user-chat.command';
import { ExceptionBase } from '@libs/exceptions';
import { CreateUserMessageRequest } from '@modules/user/interface/adapters/request/create-user-message.request';
import { CreateUserMessageCommand } from '@modules/user/application/commands/create-user-message.command';
import { FindUserChatByIdQuery } from '@modules/user/application/query/queries/find-user-chat-by-id.query';
import { UserChatResponse } from '@modules/user/interface/adapters/response/user-chat.response';
import { FindDoesChatExistQuery } from '@modules/user/application/query/queries/find-does-chat-exist.query';

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

  @Get(routesV1.chat.doesChatExist)
  async doesChatExist(
    @Query('userOneId') userOneId: string, //Define non empty validators for these.
    @Query('userTwoId') userTwoId: string,
  ): Promise<IdResponse> {
    const query = new FindDoesChatExistQuery({
      userOneId: userOneId,
      userTwoId: userTwoId,
    });

    const result: Result<AggregateID, ExceptionBase> =
      await this.queryBus.execute(query);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        throw new NotFoundException(
          `This chat has not yet been created.: ${error}`,
        ); //make a custom error for this.
      },
    });
  }

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
        // if (error instanceof UserAlreadyExistsError)
        //   throw new ConflictHttpException(error.message); Define specific HTTP exception errors.
        throw error;
      },
    });
  }

  @Get(routesV1.chat.findChat)
  async findChatById(
    @Query('chatId') chatId: string,
  ): Promise<UserChatResponse> {
    const query = new FindUserChatByIdQuery({
      chatId,
    });

    const result: Result<UserChatResponse, ExceptionBase> =
      await this.queryBus.execute(query);

    if (
      result.isErr() //Improve error handling
    ) {
      throw new NotFoundException();
    }

    return result.unwrap();
  }

  @Post(routesV1.chat.message)
  async createUserMessage(
    @Body() createUserMessageRequest: CreateUserMessageRequest,
  ) {
    const command = new CreateUserMessageCommand({
      chatId: createUserMessageRequest.chatId,
      content: createUserMessageRequest.content,
      senderId: createUserMessageRequest.senderId,
      timestamp: createUserMessageRequest.timestamp,
    });

    const result: Result<AggregateID, ExceptionBase> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        // if (error instanceof UserAlreadyExistsError)
        //   throw new ConflictHttpException(error.message); Define specific HTTP exception errors.
        throw error;
      },
    });
  }
}
