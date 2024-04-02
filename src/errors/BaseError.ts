export class BaseError extends Error {
  public readonly status: number;

  public readonly code: string;

  public readonly userMessage: string;

  public readonly details: BaseError[];

  constructor(status: number, code: string, message?: string, details?: any) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      code: this.code,
      userMessage: this.userMessage,
      details: this.details,
    };
  }
}
