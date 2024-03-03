import { ExceptionBase } from '@libs/exceptions';

export class CultureAlreadyExistsError extends ExceptionBase {
  static readonly message = 'Culture already exists';

  public readonly code = 'CULTURE.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(CultureAlreadyExistsError.message, cause, metadata);
  }
}
