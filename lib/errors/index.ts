export class ValidationError extends Error {
  private statusCode: string;

  constructor(statusCode: string, message?: string) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = statusCode;
  }
}

export class JoinError extends Error {
  private statusCode: string;

  constructor(statusCode: string, message?: string) {
    super(message);
    this.name = 'JoinError';
    this.statusCode = statusCode;
  }
}
