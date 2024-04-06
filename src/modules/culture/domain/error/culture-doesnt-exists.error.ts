import { ExceptionBase } from '@libs/exceptions';

export class CultureDoesntExistsError extends ExceptionBase {
  static readonly message = `Culture doesn't exists`;

  public readonly code = 'CULTURE.DOESNT_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(CultureDoesntExistsError.message, cause, metadata);
  }
}
