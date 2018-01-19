import {expect} from 'chai'

import * as HTTPStatus from '.'

describe('HTTP Status', () => {
  describe('Constants', () => {
    it('should have OK = 200', () => {
      expect(HTTPStatus.OK).equals(200)
    })

    it('should have CREATED = 200', () => {
      expect(HTTPStatus.CREATED).equals(201)
    })
    it('should have ACCEPTED = 202', () => {
      expect(HTTPStatus.ACCEPTED).equals(202)
    })
    it('should have NO_CONTENT = 204', () => {
      expect(HTTPStatus.NO_CONTENT).equals(204)
    })
    it('should have MOVED_PERMANENTLY = 301', () => {
      expect(HTTPStatus.MOVED_PERMANENTLY).equals(301)
    })
    it('should have FOUND = 302', () => {
      expect(HTTPStatus.FOUND).equals(302)
    })
    it('should have SEE_OTHER = 303', () => {
      expect(HTTPStatus.SEE_OTHER).equals(303)
    })
    it('should have TEMPORARY_REDIRECT = 307', () => {
      expect(HTTPStatus.TEMPORARY_REDIRECT).equals(307)
    })
    it('should have PERMANENT_REDIRECT = 308', () => {
      expect(HTTPStatus.PERMANENT_REDIRECT).equals(308)
    })
    it('should have BAD_REQUEST = 400', () => {
      expect(HTTPStatus.BAD_REQUEST).equals(400)
    })
    it('should have UNAUTHORIZED = 401', () => {
      expect(HTTPStatus.UNAUTHORIZED).equals(401)
    })
    it('should have FORBIDDEN = 403', () => {
      expect(HTTPStatus.FORBIDDEN).equals(403)
    })
    it('should have NOT_FOUND = 404', () => {
      expect(HTTPStatus.NOT_FOUND).equals(404)
    })
    it('should have NOT_ACCEPTABLE = 406', () => {
      expect(HTTPStatus.NOT_ACCEPTABLE).equals(406)
    })
    it('should have TOO_MANY_REQUEST = 429', () => {
      expect(HTTPStatus.TOO_MANY_REQUEST).equals(429)
    })
    it('should have INTERNAL_SERVER_ERROR = 500', () => {
      expect(HTTPStatus.INTERNAL_SERVER_ERROR).equals(500)
    })
    it('should have NOT_IMPLEMENTED = 501', () => {
      expect(HTTPStatus.NOT_IMPLEMENTED).equals(501)
    })
    it('should have BAD_GATEWAY = 502', () => {
      expect(HTTPStatus.BAD_GATEWAY).equals(502)
    })
    it('should have SERVICE_UNAVAILABLE = 503', () => {
      expect(HTTPStatus.SERVICE_UNAVAILABLE).equals(503)
    })
    it('should have GATEWAY_TIMEOUT = 504', () => {
      expect(HTTPStatus.GATEWAY_TIMEOUT).equals(504)
    })
  })

  describe('HTTPError', () => {
    it('should extends Error', () => {
      const httpError = new HTTPStatus.HTTPError(
        500,
        'E_INTERNAL_SERVER_ERROR',
        'Something went wrong.',
        'Internal Server Error'
      )
      expect(httpError).instanceOf(Error)
    })

    it('should have toJSON instance method', () => {
      expect(HTTPStatus.HTTPError).respondsTo('toJSON')

      const httpError = new HTTPStatus.HTTPError(
        500,
        'E_INTERNAL_SERVER_ERROR',
        'Something went wrong.',
        'Internal Server Error'
      )

      const json = httpError.toJSON()

      expect(json.error).a('object')
      expect(json.error.status)
        .an('number')
        .equals(500)
      expect(json.error.code)
        .a('string')
        .equals('E_INTERNAL_SERVER_ERROR')
      expect(json.error.message)
        .a('string')
        .equals('Something went wrong.')
      expect(json.error.description)
        .a('string')
        .equals('Internal Server Error')
    })
  })

  describe('Throwable errors', () => {
    describe('MovedPermanently', () => {
      const httpError = new HTTPStatus.MovedPermanently('http://redirect.test')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 301', () => {
        expect(httpError.status).equals(HTTPStatus.MOVED_PERMANENTLY)
      })

      it('should have code = "E_MOVED_PERMANENTLY"', () => {
        expect(httpError.code).equals('E_MOVED_PERMANENTLY')
      })

      it('should have message = "http://redirect.test"', () => {
        expect(httpError.message).equals('http://redirect.test')
      })

      it('should have description = "Moved Permanently"', () => {
        expect(httpError.description).equals('Moved Permanently')
      })
    })

    describe('Found', () => {
      const httpError = new HTTPStatus.Found('http://redirect.test')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 302', () => {
        expect(httpError.status).equals(HTTPStatus.FOUND)
      })

      it('should have code = "E_FOUND"', () => {
        expect(httpError.code).equals('E_FOUND')
      })

      it('should have message = "http://redirect.test"', () => {
        expect(httpError.message).equals('http://redirect.test')
      })

      it('should have description = "Found"', () => {
        expect(httpError.description).equals('Found')
      })
    })

    describe('SeeOther', () => {
      const httpError = new HTTPStatus.SeeOther('http://redirect.test')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 303', () => {
        expect(httpError.status).equals(HTTPStatus.SEE_OTHER)
      })

      it('should have code = "E_SEE_OTHER"', () => {
        expect(httpError.code).equals('E_SEE_OTHER')
      })

      it('should have message = "http://redirect.test"', () => {
        expect(httpError.message).equals('http://redirect.test')
      })

      it('should have description = "See Other"', () => {
        expect(httpError.description).equals('See Other')
      })
    })

    describe('TemporaryRedirect', () => {
      const httpError = new HTTPStatus.TemporaryRedirect('http://redirect.test')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 307', () => {
        expect(httpError.status).equals(HTTPStatus.TEMPORARY_REDIRECT)
      })

      it('should have code = "E_TEMPORARY_REDIRECT"', () => {
        expect(httpError.code).equals('E_TEMPORARY_REDIRECT')
      })

      it('should have message = "http://redirect.test"', () => {
        expect(httpError.message).equals('http://redirect.test')
      })

      it('should have description = "Temporary Redirect"', () => {
        expect(httpError.description).equals('Temporary Redirect')
      })
    })

    describe('PermanentRedirect', () => {
      const httpError = new HTTPStatus.PermanentRedirect('http://redirect.test')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 308', () => {
        expect(httpError.status).equals(HTTPStatus.PERMANENT_REDIRECT)
      })

      it('should have code = "E_PERMANENT_REDIRECT"', () => {
        expect(httpError.code).equals('E_PERMANENT_REDIRECT')
      })

      it('should have message = "http://redirect.test"', () => {
        expect(httpError.message).equals('http://redirect.test')
      })

      it('should have description = "Permanent Redirect"', () => {
        expect(httpError.description).equals('Permanent Redirect')
      })
    })

    describe('BadRequest', () => {
      const httpError = new HTTPStatus.BadRequest('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 400', () => {
        expect(httpError.status).equals(HTTPStatus.BAD_REQUEST)
      })

      it('should have code = "E_BAD_REQUEST"', () => {
        expect(httpError.code).equals('E_BAD_REQUEST')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Bad Request"', () => {
        expect(httpError.description).equals('Bad Request')
      })
    })

    describe('Unauthorized', () => {
      const httpError = new HTTPStatus.Unauthorized('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 401', () => {
        expect(httpError.status).equals(HTTPStatus.UNAUTHORIZED)
      })

      it('should have code = "E_UNAUTHORIZED"', () => {
        expect(httpError.code).equals('E_UNAUTHORIZED')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Unauthorized"', () => {
        expect(httpError.description).equals('Unauthorized')
      })
    })

    describe('Forbidden', () => {
      const httpError = new HTTPStatus.Forbidden('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 403', () => {
        expect(httpError.status).equals(HTTPStatus.FORBIDDEN)
      })

      it('should have code = "E_FORBIDDEN"', () => {
        expect(httpError.code).equals('E_FORBIDDEN')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Forbidden"', () => {
        expect(httpError.description).equals('Forbidden')
      })
    })

    describe('NotFound', () => {
      const httpError = new HTTPStatus.NotFound('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 404', () => {
        expect(httpError.status).equals(HTTPStatus.NOT_FOUND)
      })

      it('should have code = "E_NOT_FOUND"', () => {
        expect(httpError.code).equals('E_NOT_FOUND')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Not Found"', () => {
        expect(httpError.description).equals('Not Found')
      })
    })

    describe('NotAcceptable', () => {
      const httpError = new HTTPStatus.NotAcceptable('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 406', () => {
        expect(httpError.status).equals(HTTPStatus.NOT_ACCEPTABLE)
      })

      it('should have code = "E_NOT_ACCEPTABLE"', () => {
        expect(httpError.code).equals('E_NOT_ACCEPTABLE')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Not Acceptable"', () => {
        expect(httpError.description).equals('Not Acceptable')
      })
    })

    describe('TooManyRequest', () => {
      const httpError = new HTTPStatus.TooManyRequest('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 429', () => {
        expect(httpError.status).equals(HTTPStatus.TOO_MANY_REQUEST)
      })

      it('should have code = "E_TOO_MANY_REQUEST"', () => {
        expect(httpError.code).equals('E_TOO_MANY_REQUEST')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Too Many Request"', () => {
        expect(httpError.description).equals('Too Many Request')
      })
    })

    describe('InternalServerError', () => {
      const httpError = new HTTPStatus.InternalServerError('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 500', () => {
        expect(httpError.status).equals(HTTPStatus.INTERNAL_SERVER_ERROR)
      })

      it('should have code = "E_INTERNAL_SERVER_ERROR"', () => {
        expect(httpError.code).equals('E_INTERNAL_SERVER_ERROR')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Internal Server Error"', () => {
        expect(httpError.description).equals('Internal Server Error')
      })
    })

    describe('NotImplemented', () => {
      const httpError = new HTTPStatus.NotImplemented('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 501', () => {
        expect(httpError.status).equals(HTTPStatus.NOT_IMPLEMENTED)
      })

      it('should have code = "E_NOT_IMPLEMENTED"', () => {
        expect(httpError.code).equals('E_NOT_IMPLEMENTED')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Not Implemented"', () => {
        expect(httpError.description).equals('Not Implemented')
      })
    })

    describe('BadGateway', () => {
      const httpError = new HTTPStatus.BadGateway('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 502', () => {
        expect(httpError.status).equals(HTTPStatus.BAD_GATEWAY)
      })

      it('should have code = "E_BAD_GATEWAY"', () => {
        expect(httpError.code).equals('E_BAD_GATEWAY')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Bad Gateway"', () => {
        expect(httpError.description).equals('Bad Gateway')
      })
    })

    describe('ServiceUnavailable', () => {
      const httpError = new HTTPStatus.ServiceUnavailable('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 503', () => {
        expect(httpError.status).equals(HTTPStatus.SERVICE_UNAVAILABLE)
      })

      it('should have code = "E_SERVICE_UNAVAILABLE"', () => {
        expect(httpError.code).equals('E_SERVICE_UNAVAILABLE')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Service Unavailable"', () => {
        expect(httpError.description).equals('Service Unavailable')
      })
    })

    describe('GatewayTimeout', () => {
      const httpError = new HTTPStatus.GatewayTimeout('test message')

      it('should extends HTTPError', () => {
        expect(httpError).instanceOf(HTTPStatus.HTTPError)
      })

      it('should have status = 504', () => {
        expect(httpError.status).equals(HTTPStatus.GATEWAY_TIMEOUT)
      })

      it('should have code = "E_GATEWAY_TIMEOUT"', () => {
        expect(httpError.code).equals('E_GATEWAY_TIMEOUT')
      })

      it('should have message = "test message"', () => {
        expect(httpError.message).equals('test message')
      })

      it('should have description = "Gateway Timeout"', () => {
        expect(httpError.description).equals('Gateway Timeout')
      })
    })
  })

  describe('Functions', () => {
    describe('createError', () => {
      it('should return MovedPermanently instance when status = 301', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.MOVED_PERMANENTLY, 'test')
        ).instanceOf(HTTPStatus.MovedPermanently)
      })

      it('should return Found instance when status = 302', () => {
        expect(HTTPStatus.createError(HTTPStatus.FOUND, 'test')).instanceOf(
          HTTPStatus.Found
        )
      })

      it('should return SeeOther instance when status = 303', () => {
        expect(HTTPStatus.createError(HTTPStatus.SEE_OTHER, 'test')).instanceOf(
          HTTPStatus.SeeOther
        )
      })

      it('should return TemporaryRedirect instance when status = 307', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.TEMPORARY_REDIRECT, 'test')
        ).instanceOf(HTTPStatus.TemporaryRedirect)
      })

      it('should return PermanentRedirect instance when status = 308', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.PERMANENT_REDIRECT, 'test')
        ).instanceOf(HTTPStatus.PermanentRedirect)
      })

      it('should return BadRequest instance when status = 400', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.BAD_REQUEST, 'test')
        ).instanceOf(HTTPStatus.BadRequest)
      })

      it('should return Unauthorized instance when status = 401', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.UNAUTHORIZED, 'test')
        ).instanceOf(HTTPStatus.Unauthorized)
      })

      it('should return Forbidden instance when status = 403', () => {
        expect(HTTPStatus.createError(HTTPStatus.FORBIDDEN, 'test')).instanceOf(
          HTTPStatus.Forbidden
        )
      })

      it('should return NotFound instance when status = 404', () => {
        expect(HTTPStatus.createError(HTTPStatus.NOT_FOUND, 'test')).instanceOf(
          HTTPStatus.NotFound
        )
      })

      it('should return NotAcceptable instance when status = 406', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.NOT_ACCEPTABLE, 'test')
        ).instanceOf(HTTPStatus.NotAcceptable)
      })

      it('should return TooManyRequest instance when status = 429', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.TOO_MANY_REQUEST, 'test')
        ).instanceOf(HTTPStatus.TooManyRequest)
      })

      it('should return InternalServerError instance when status = 500', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.INTERNAL_SERVER_ERROR, 'test')
        ).instanceOf(HTTPStatus.InternalServerError)
      })

      it('should return NotImplemented instance when status = 501', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.NOT_IMPLEMENTED, 'test')
        ).instanceOf(HTTPStatus.NotImplemented)
      })

      it('should return BadGateway instance when status = 502', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.BAD_GATEWAY, 'test')
        ).instanceOf(HTTPStatus.BadGateway)
      })

      it('should return ServiceUnavailable instance when status = 503', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.SERVICE_UNAVAILABLE, 'test')
        ).instanceOf(HTTPStatus.ServiceUnavailable)
      })

      it('should return GatewayTimeout instance when status = 504', () => {
        expect(
          HTTPStatus.createError(HTTPStatus.GATEWAY_TIMEOUT, 'test')
        ).instanceOf(HTTPStatus.GatewayTimeout)
      })

      it('should return InternalServerError instance when status is not in the above list', () => {
        expect(HTTPStatus.createError(HTTPStatus.OK, 'test')).instanceOf(
          HTTPStatus.InternalServerError
        )
      })
    })

    describe('isError', () => {
      it('should return true on HTTPError instance', () => {
        const httpError = new HTTPStatus.HTTPError(
          500,
          'E_INTERNAL_SERVER_ERROR',
          'Something went wrong.',
          'Internal Server Error'
        )
        expect(HTTPStatus.isError(httpError)).equals(true)
      })

      it('should return true on Error instance', () => {
        const error = new Error()
        expect(HTTPStatus.isError(error)).equals(true)
      })

      it('should return true on object that quacks like HTTPError', () => {
        const httpError = {
          error: {
            status: 500,
            code: 'E_INTERNAL_SERVER_ERROR',
            message: 'Something went wrong',
            description: 'Internal Server Error',
          },
        }
        expect(HTTPStatus.isError(httpError)).equals(true)
      })

      it('should return false again anything else', () => {
        expect(HTTPStatus.isError({} as any)).equals(false)
        expect(HTTPStatus.isError(null)).equals(false)
        expect(HTTPStatus.isError(undefined)).equals(false)
        expect(HTTPStatus.isError(NaN as any)).equals(false)
        expect(HTTPStatus.isError(42 as any)).equals(false)
        expect(HTTPStatus.isError('string' as any)).equals(false)
        expect(HTTPStatus.isError(true as any)).equals(false)
        expect(HTTPStatus.isError(false as any)).equals(false)
      })
    })

    describe('toError', () => {
      it('should return HTTPError as it', () => {
        const httpError = new HTTPStatus.HTTPError(
          500,
          'E_INTERNAL_SERVER_ERROR',
          'Something went wrong.',
          'Internal Server Error'
        )
        expect(HTTPStatus.toError(httpError)).equals(httpError)
      })

      it('should return InternalServerError from Error', () => {
        const error = new Error('test')
        expect(HTTPStatus.toError(error)).instanceOf(
          HTTPStatus.InternalServerError
        )
      })

      it('should return correct HTTPError from object that quacks like HTTPError', () => {
        const httpError = {
          error: {
            status: 400,
            code: 'E_BAD_REQUEST',
            message: 'test',
            description: 'Bad Request',
          },
        }
        expect(HTTPStatus.toError(httpError)).instanceOf(HTTPStatus.BadRequest)
      })

      it('should return null on anything else', () => {
        expect(HTTPStatus.toError({} as any)).equals(null)
        expect(HTTPStatus.toError(null)).equals(null)
        expect(HTTPStatus.toError(undefined)).equals(null)
        expect(HTTPStatus.toError(NaN as any)).equals(null)
        expect(HTTPStatus.toError(42 as any)).equals(null)
        expect(HTTPStatus.toError('string' as any)).equals(null)
        expect(HTTPStatus.toError(true as any)).equals(null)
        expect(HTTPStatus.toError(false as any)).equals(null)
      })
    })

    describe('isRedirectError', () => {
      it('should return true on status >= 300 && < 400', () => {
        // Test with HTTPError instance
        expect(
          HTTPStatus.isRedirectError(new HTTPStatus.MovedPermanently('test'))
        ).equals(true)

        expect(
          HTTPStatus.isRedirectError(new HTTPStatus.BadRequest('test'))
        ).equals(false)

        // Test with HTTPJSONError
        expect(
          HTTPStatus.isRedirectError({
            error: {
              status: 301,
              code: 'E_MOVED_PERMANENTLY',
              message: 'test',
              description: 'Moved Permanently',
            },
          })
        ).equals(true)

        expect(
          HTTPStatus.isRedirectError({
            error: {
              status: 400,
              code: 'E_BAD_REQUEST',
              message: 'test',
              description: 'Bad Request',
            },
          })
        ).equals(false)

        expect(
          HTTPStatus.isRedirectError({
            error: {
              status: 200,
              code: 'OK',
              message: 'test',
              description: 'Ok',
            },
          })
        ).equals(false)

        expect(HTTPStatus.isRedirectError({} as any)).equals(false)
      })
    })

    describe('isClientError', () => {
      it('should return true on status >= 400 && < 500', () => {
        // Test with HTTPError instance
        expect(
          HTTPStatus.isClientError(new HTTPStatus.BadRequest('test'))
        ).equals(true)

        expect(
          HTTPStatus.isClientError(new HTTPStatus.MovedPermanently('test'))
        ).equals(false)

        expect(
          HTTPStatus.isClientError(new HTTPStatus.InternalServerError('test'))
        ).equals(false)

        // Test with HTTPJSONError
        expect(
          HTTPStatus.isClientError({
            error: {
              status: 400,
              code: 'E_BAD_REQUEST',
              message: 'test',
              description: 'Bad Request',
            },
          })
        ).equals(true)

        expect(
          HTTPStatus.isClientError({
            error: {
              status: 301,
              code: 'E_MOVED_PERMANENTLY',
              message: 'test',
              description: 'Moved Permanently',
            },
          })
        ).equals(false)

        expect(
          HTTPStatus.isClientError({
            error: {
              status: 500,
              code: 'E_INTERNAL_SERVER_ERROR',
              message: 'test',
              description: 'Internal Server Error',
            },
          })
        ).equals(false)

        expect(HTTPStatus.isClientError({} as any)).equals(false)
      })
    })

    describe('isServerError', () => {
      it('should return true on status >= 500 && < 600', () => {
        // Test with HTTPError instance
        expect(
          HTTPStatus.isServerError(new HTTPStatus.InternalServerError('test'))
        ).equals(true)

        expect(
          HTTPStatus.isServerError(new HTTPStatus.BadRequest('test'))
        ).equals(false)

        // Test with HTTPJSONError
        expect(
          HTTPStatus.isServerError({
            error: {
              status: 500,
              code: 'E_INTERNAL_SERVER_ERROR',
              message: 'test',
              description: 'Internal Server Error',
            },
          })
        ).equals(true)

        expect(
          HTTPStatus.isServerError({
            error: {
              status: 400,
              code: 'E_BAD_REQUEST',
              message: 'test',
              description: 'Bad Request',
            },
          })
        ).equals(false)

        expect(
          HTTPStatus.isServerError({
            error: {
              status: 600,
              code: 'E_FOO_BAR',
              message: 'test',
              description: 'Foo Bar',
            },
          })
        ).equals(false)

        expect(HTTPStatus.isServerError({} as any)).equals(false)
      })
    })
  })
})
