import { RequestContext } from 'nestjs-request-context';
import { DatabaseTransactionConnection } from 'slonik';

/**
 * Setting some isolated context for each request.
 */

export class AppRequestContext extends RequestContext {
  requestId?: string;
  transactionConnection?: DatabaseTransactionConnection; // For global transactions
}

export class RequestContextService {
  static getContext(): AppRequestContext {
    const ctx: AppRequestContext = RequestContext.currentContext?.req;
    return ctx;
  }

  static setRequestId(id: string): void {
    const ctx = this.getContext();
    if (ctx) ctx.requestId = id;
  }

  static getRequestId(): string | undefined {
    return this.getContext() ? this.getContext().requestId : undefined;
  }

  static getTransactionConnection(): DatabaseTransactionConnection | undefined {
    const ctx = this.getContext();
    return ctx.transactionConnection;
  }

  static setTransactionConnection(
    transactionConnection?: DatabaseTransactionConnection,
  ): void {
    const ctx = this.getContext();
    ctx.transactionConnection = transactionConnection;
  }

  static cleanTransactionConnection(): void {
    const ctx = this.getContext();
    ctx.transactionConnection = undefined;
  }
}
