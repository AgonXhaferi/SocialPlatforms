import { ExceptionBase } from '@libs/exceptions';

export class UserDoesntExistError extends ExceptionBase {
  static readonly message = 'User doesnt exist';

  public readonly code = 'USER.DOESNT_EXIST';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserDoesntExistError.message, cause, metadata);
  }
}
