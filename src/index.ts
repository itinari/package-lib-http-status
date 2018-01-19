export interface HTTPJSONError {
  error: {
    status: number
    code: string
    message: string
    description: string
  }
}

export class HTTPError extends Error {
  message: string
  code: string
  status: number
  description: string

  constructor(
    status: number,
    code: string,
    message: string,
    description?: string
  ) {
    super(message)
    this.name = this.constructor.name
    this.status = status
    this.code = code
    this.message = message
    this.description = description
  }

  toJSON(): HTTPJSONError {
    return {
      error: {
        status: this.status,
        code: this.code,
        message: this.message,
        description: this.description,
      },
    }
  }
}

// NOTE: https://i.stack.imgur.com/fyqUl.png

export const OK = 200
export const CREATED = 201
export const ACCEPTED = 202
export const NO_CONTENT = 204
export const MOVED_PERMANENTLY = 301
export const FOUND = 302
export const SEE_OTHER = 303
export const TEMPORARY_REDIRECT = 307
export const PERMANENT_REDIRECT = 308
export const BAD_REQUEST = 400
export const UNAUTHORIZED = 401
export const FORBIDDEN = 403
export const NOT_FOUND = 404
export const NOT_ACCEPTABLE = 406
export const TOO_MANY_REQUEST = 429
export const INTERNAL_SERVER_ERROR = 500
export const NOT_IMPLEMENTED = 501
export const BAD_GATEWAY = 502
export const SERVICE_UNAVAILABLE = 503
export const GATEWAY_TIMEOUT = 504

export class MovedPermanently extends HTTPError {
  constructor(url: string) {
    super(MOVED_PERMANENTLY, 'E_MOVED_PERMANENTLY', url, 'Moved Permanently')
  }
}

export class Found extends HTTPError {
  constructor(url: string) {
    super(FOUND, 'E_FOUND', url, 'Found')
  }
}

export class SeeOther extends HTTPError {
  constructor(url: string) {
    super(SEE_OTHER, 'E_SEE_OTHER', url, 'See Other')
  }
}

export class TemporaryRedirect extends HTTPError {
  constructor(url: string) {
    super(TEMPORARY_REDIRECT, 'E_TEMPORARY_REDIRECT', url, 'Temporary Redirect')
  }
}

export class PermanentRedirect extends HTTPError {
  constructor(url: string) {
    super(PERMANENT_REDIRECT, 'E_PERMANENT_REDIRECT', url, 'Permanent Redirect')
  }
}

export class BadRequest extends HTTPError {
  constructor(message?: string) {
    super(BAD_REQUEST, 'E_BAD_REQUEST', message, 'Bad Request')
  }
}

export class Unauthorized extends HTTPError {
  constructor(message?: string) {
    super(UNAUTHORIZED, 'E_UNAUTHORIZED', message, 'Unauthorized')
  }
}

export class Forbidden extends HTTPError {
  constructor(message?: string) {
    super(FORBIDDEN, 'E_FORBIDDEN', message, 'Forbidden')
  }
}

export class NotFound extends HTTPError {
  constructor(message?: string) {
    super(NOT_FOUND, 'E_NOT_FOUND', message, 'Not Found')
  }
}

export class NotAcceptable extends HTTPError {
  constructor(message?: string) {
    super(NOT_ACCEPTABLE, 'E_NOT_ACCEPTABLE', message, 'Not Acceptable')
  }
}

export class TooManyRequest extends HTTPError {
  constructor(message?: string) {
    super(TOO_MANY_REQUEST, 'E_TOO_MANY_REQUEST', message, 'Too Many Request')
  }
}

export class InternalServerError extends HTTPError {
  constructor(message?: string) {
    super(
      INTERNAL_SERVER_ERROR,
      'E_INTERNAL_SERVER_ERROR',
      message,
      'Internal Server Error'
    )
  }
}

export class NotImplemented extends HTTPError {
  constructor(message?: string) {
    super(NOT_IMPLEMENTED, 'E_NOT_IMPLEMENTED', message, 'Not Implemented')
  }
}

export class BadGateway extends HTTPError {
  constructor(message?: string) {
    super(BAD_GATEWAY, 'E_BAD_GATEWAY', message, 'Bad Gateway')
  }
}

export class ServiceUnavailable extends HTTPError {
  constructor(message?: string) {
    super(
      SERVICE_UNAVAILABLE,
      'E_SERVICE_UNAVAILABLE',
      message,
      'Service Unavailable'
    )
  }
}

export class GatewayTimeout extends HTTPError {
  constructor(message?: string) {
    super(GATEWAY_TIMEOUT, 'E_GATEWAY_TIMEOUT', message, 'Gateway Timeout')
  }
}

export function createError(status: number, message: string): HTTPError {
  switch (status) {
    case MOVED_PERMANENTLY:
      return new MovedPermanently(message)
    case FOUND:
      return new Found(message)
    case SEE_OTHER:
      return new SeeOther(message)
    case TEMPORARY_REDIRECT:
      return new TemporaryRedirect(message)
    case PERMANENT_REDIRECT:
      return new PermanentRedirect(message)
    case BAD_REQUEST:
      return new BadRequest(message)
    case UNAUTHORIZED:
      return new Unauthorized(message)
    case FORBIDDEN:
      return new Forbidden(message)
    case NOT_FOUND:
      return new NotFound(message)
    case NOT_ACCEPTABLE:
      return new NotAcceptable(message)
    case TOO_MANY_REQUEST:
      return new TooManyRequest(message)
    case INTERNAL_SERVER_ERROR:
      return new InternalServerError(message)
    case NOT_IMPLEMENTED:
      return new NotImplemented(message)
    case BAD_GATEWAY:
      return new BadGateway(message)
    case SERVICE_UNAVAILABLE:
      return new ServiceUnavailable(message)
    case GATEWAY_TIMEOUT:
      return new GatewayTimeout(message)
    default:
      return new InternalServerError(message)
  }
}

export function toError(error: HTTPError | HTTPJSONError | Error): HTTPError {
  if (error instanceof HTTPError) {
    return error
  }

  if (error instanceof Error) {
    return new InternalServerError(error.message)
  }

  if (
    error &&
    typeof error === 'object' &&
    typeof error.error === 'object' &&
    typeof error.error.status === 'number' &&
    typeof error.error.code === 'string' &&
    typeof error.error.message === 'string' &&
    typeof error.error.description === 'string'
  ) {
    return createError(error.error.status, error.error.message)
  }

  return null
}

export function isError(error: HTTPError | HTTPJSONError | Error): boolean {
  if (error instanceof HTTPError) {
    return true
  }

  if (error instanceof Error) {
    return true
  }

  // Duck typing
  // If it looks like a duck, swims like a duck,
  // and quacks like a duck, then it probably is a duck
  if (
    error &&
    typeof error === 'object' &&
    typeof error.error === 'object' &&
    typeof error.error.status === 'number' &&
    typeof error.error.code === 'string' &&
    typeof error.error.message === 'string' &&
    typeof error.error.description === 'string'
  ) {
    return true
  }

  return false
}

export function isRedirectError(error: HTTPError | HTTPJSONError): boolean {
  let status: number

  if (error instanceof HTTPError) {
    status = error.status
  } else if (
    error &&
    typeof error === 'object' &&
    typeof error.error === 'object' &&
    typeof error.error.status === 'number' &&
    typeof error.error.code === 'string' &&
    typeof error.error.message === 'string' &&
    typeof error.error.description === 'string'
  ) {
    status = error.error.status
  }

  return status >= 300 && status < 400
}

export function isClientError(error: HTTPError | HTTPJSONError): boolean {
  let status: number

  if (error instanceof HTTPError) {
    status = error.status
  } else if (
    error &&
    typeof error === 'object' &&
    typeof error.error === 'object' &&
    typeof error.error.status === 'number' &&
    typeof error.error.code === 'string' &&
    typeof error.error.message === 'string' &&
    typeof error.error.description === 'string'
  ) {
    status = error.error.status
  }

  return status >= 400 && status < 500
}

export function isServerError(error: HTTPError | HTTPJSONError): boolean {
  let status: number

  if (error instanceof HTTPError) {
    status = error.status
  } else if (
    error &&
    typeof error === 'object' &&
    typeof error.error === 'object' &&
    typeof error.error.status === 'number' &&
    typeof error.error.code === 'string' &&
    typeof error.error.message === 'string' &&
    typeof error.error.description === 'string'
  ) {
    status = error.error.status
  }

  return status >= 500 && status < 600
}
