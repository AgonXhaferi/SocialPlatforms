import { Inject, Injectable } from '@nestjs/common';
import { CULTURE_EVENTS_REPOSITORY } from '@modules/culture/culture.di-tokens';
import { CultureEventsRepositoryPort } from '@modules/culture/application/ports/culture-events.repository.port';

@Injectable()
export class CreateCultureEventsService {
  constructor(
    @Inject(CULTURE_EVENTS_REPOSITORY)
    protected readonly cultureRepository: CultureEventsRepositoryPort,
  ) {}
}
