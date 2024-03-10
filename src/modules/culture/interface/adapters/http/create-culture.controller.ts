import {
  Body,
  ConflictException as ConflictHttpException,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { UserAlreadyExistsError } from '@modules/user/domain/errors/user-already-exists.error';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { match, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { CreateCultureRequest } from '@modules/culture/interface/adapters/request/create-culture.request';
import { CreateCultureCommand } from '@modules/culture/application/commands/create-culture.command';
import { CultureAlreadyExistsError } from '@modules/culture/domain/error/culture-already-exists.error';
import { ZodValidationPipe } from 'nestjs-zod';

@UsePipes(ZodValidationPipe)
@Controller(routesV1.version)
export class CreateCultureController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Create a culture' })
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
  @Post(routesV1.culture.root)
  async create(@Body() body: CreateCultureRequest): Promise<IdResponse> {
    const command = new CreateCultureCommand({
      name: body.name,
      location: body.location,
      language: body.language,
    });

    const result: Result<AggregateID, CultureAlreadyExistsError> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof CultureAlreadyExistsError)
          throw new ConflictHttpException(error.message);
        throw error;
      },
    });
  }
}
