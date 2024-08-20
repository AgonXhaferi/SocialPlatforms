import {
  Body,
  ConflictException as ConflictHttpException,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from '@libs/api/id.response.dto';
import { ApiErrorResponse } from '@libs/api/api-error.response';
import { match, Result } from 'oxide.ts';
import { AggregateID } from '@libs/ddd';
import { CreateCultureRequest } from '@modules/culture/interface/request/create-culture.request';
import { CreateCultureCommand } from '@modules/culture/application/commands/create-culture.command';
import { CultureAlreadyExistsError } from '@modules/culture/domain/error/culture-already-exists.error';
import { ZodValidationPipe } from 'nestjs-zod';
import { CreateCultureArticleRequest } from '@modules/culture/interface/request/create-culture-article.request';
import { CreateCultureEventRequest } from '@modules/culture/interface/request/create-culture-event.request';
import { CreateCultureArticleCommand } from '@modules/culture/application/commands/create-culture-article.command';
import { ExceptionBase } from '@libs/exceptions';
import { CreateCultureEventCommand } from '@modules/culture/application/commands/create-culture-event.command';
import { FindCultureQuery } from '@modules/culture/application/queries/culture/find-culture.query';
import { CultureResponse } from '@modules/culture/interface/response/culture.response';
import { CultureDoesntExistsError } from '@modules/culture/domain/error/culture-doesnt-exists.error';
import { CreateCultureSubscriptionCommand } from '@modules/culture/application/commands/create-culture-subscription.command';
import { CreateCultureSubscriptionRequest } from '@modules/culture/interface/request/create-culture-subscription.request';
import { FindIsUserSubscribedToCultureQuery } from '@modules/culture/application/queries/culture/find-is-user-subscribed-to-culture.query';
import { CultureSubscriptionError } from '@modules/culture/domain/error/culture-subscription.error';
import { FindLatestCultureArticlesQuery } from '@modules/culture/application/queries/culture-articles/find-latest-culture-articles.query';
import { CultureArticleResponse } from '@modules/culture/interface/response/culture-article.response';
import { FindLatestCultureEventsQuery } from '@modules/culture/application/queries/culture-events/find-latest-culture-events.query';
import { CultureEventResponse } from '@modules/culture/interface/response/culture-event.response';
import { FindCultureArticleByNameQuery } from '@modules/culture/application/queries/culture-articles/find-culture-article-by-name.query';
import { FindCultureEventByNameQuery } from '@modules/culture/application/queries/culture-events/find-culture-event-by-name.query';

@UsePipes(ZodValidationPipe)
@Controller({
  version: routesV1.version,
  path: routesV1.culture.root,
})
export class CultureController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @ApiOperation({ summary: 'Create a culture' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CultureAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Get()
  async findCulturesById(@Query('cultureName') cultureName: string) {
    const query = new FindCultureQuery({ cultureName });

    const result: Result<CultureResponse[], Error> =
      await this.queryBus.execute(query);

    if (
      result.isErr() &&
      result.unwrapErr() instanceof CultureDoesntExistsError
    ) {
      throw new NotFoundException();
    }

    return result.unwrap();
  }

  @Get(routesV1.culture.findLatestArticle)
  async findLatestCultureArticles(
    @Query('cultureName') cultureName: string,
    @Query('numberOfArticles') numberOfArticles: number,
  ): Promise<CultureArticleResponse[]> {
    const query = new FindLatestCultureArticlesQuery({
      cultureName,
      numberOfArticles,
    });

    return await this.queryBus.execute(query);
  }

  @Get(routesV1.culture.findLatestEvents)
  async findLatestCultureEvents(
    @Query('cultureName') cultureName: string,
    @Query('numberOfEvents') numberOfEvents: number,
  ): Promise<CultureEventResponse> {
    const query = new FindLatestCultureEventsQuery({
      cultureName,
      numberOfEvents,
    });

    return await this.queryBus.execute(query);
  }

  @Get(routesV1.culture.findArticleByTitle)
  async findArticleByTitle(
    @Query('cultureName') cultureName: string,
    @Query('title') title: string,
  ): Promise<CultureEventResponse[]> {
    const query = new FindCultureArticleByNameQuery({
      cultureName,
      articleName: title,
    });

    return await this.queryBus.execute(query);
  }

  @Get(routesV1.culture.findEventByName)
  async findEventByName(
    @Query('cultureName') cultureName: string,
    @Query('eventName') eventName: string,
  ): Promise<CultureEventResponse[]> {
    const query = new FindCultureEventByNameQuery({
      cultureName,
      eventName,
    });

    return await this.queryBus.execute(query);
  }

  @ApiOperation({ summary: 'Find if user is subscribed to culture.' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CultureAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Get(routesV1.culture.isSubscribed)
  async findIsUserSubscribedToCulture(
    @Query('cultureName') cultureName: string,
    @Query('userId') userId: string,
  ) {
    const query = new FindIsUserSubscribedToCultureQuery({
      userId,
      cultureId: cultureName,
    });

    const result: Result<boolean, Error> = await this.queryBus.execute(query);

    if (
      result.isErr() &&
      result.unwrapErr() instanceof CultureDoesntExistsError
    ) {
      throw new NotFoundException();
    }

    return result.unwrap();
  }

  @ApiOperation({ summary: 'Create a culture' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CultureAlreadyExistsError.message,
    type: ApiErrorResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.culture.create)
  async createCulture(@Body() body: CreateCultureRequest): Promise<IdResponse> {
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

  @ApiOperation({ summary: 'Subscribe to a culture' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.culture.subscribe)
  async subscribeToCulture(
    @Body() body: CreateCultureSubscriptionRequest,
  ): Promise<IdResponse> {
    const command = new CreateCultureSubscriptionCommand({
      cultureId: body.cultureId,
      userId: body.userId,
      isPrimary: false,
    });

    const result: Result<AggregateID, CultureDoesntExistsError> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (id: string) => new IdResponse(id),
      Err: (error: Error) => {
        if (error instanceof CultureSubscriptionError)
          throw new ConflictHttpException(error.cause.message);
        throw error;
      },
    });
  }

  @Post(routesV1.culture.createArticle)
  async createCultureArticle(
    @Body() body: CreateCultureArticleRequest,
  ): Promise<IdResponse> {
    const command = new CreateCultureArticleCommand({
      content: body.content,
      title: body.title,
      culture: body.culture,
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

  @Post(routesV1.culture.createEvent)
  async createCultureEvent(
    @Body() body: CreateCultureEventRequest,
  ): Promise<IdResponse> {
    const command = new CreateCultureEventCommand({
      name: body.name,
      description: body.description,
      startDate: body.startDate,
      endDate: body.endDate,
      latitude: body.latitude,
      longitude: body.longitude,
      culture: body.culture,
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
