import { ExceptionBase } from '@libs/exceptions';

export class CultureSubscriptionError extends ExceptionBase {
  static readonly message = `Culture subscription error`;

  public readonly code = 'CULTURE.SUBSCRIPTION_ERROR';

  constructor(cause?: Error, metadata?: unknown) {
    super(CultureSubscriptionError.message, cause, metadata);
  }
}
