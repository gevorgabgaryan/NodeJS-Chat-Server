import { BaseError } from './BaseError';

export class NotFoundError extends BaseError {
  constructor(entityName?: string) {
    super(
      404,
      'resource_not_found',
      entityName ? `'${entityName}' not found.` : 'Resource not found.',
    );
  }
}
