import { Injectable } from '@angular/core'
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs'
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators'
import { IRegistrationField } from './app/interfaces/registration-field.interface'

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept (
    request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request

    return of(null).
      pipe(mergeMap(handleRoute)).
      pipe(materialize()).
      pipe(delay(500)).
      pipe(dematerialize())

    function handleRoute () {
      switch (true) {
        case url.endsWith('/form') && method === 'GET':
          return form()
        case url.endsWith('/signup') && method === 'POST':
          return register()
        default:
          // pass through any requests not handled above
          return next.handle(request)
      }
    }

    // route functions

    function form () {
      const fields: IRegistrationField[] = [
        {
          type: 'text',
          name: 'first_name',
          label: 'First Name',
          required: true,
          validations: [
            {
              name: 'regex',
              message: 'Only English characters are allowed.',
              value: '^[a-zA-Z0-9]*$',
            },
            {
              name: 'maxlength',
              message: 'Must be less than 64 characters.',
              value: 63,
            },
          ],
        },
        {
          type: 'text',
          name: 'middle_name',
          label: 'Middle Name',
          required: false,
          validations: [
            {
              name: 'regex',
              message: 'Only English characters are allowed.',
              value: '^[a-zA-Z0-9]*$',
            },
            {
              name: 'maxlength',
              message: 'Must be less than 64 characters.',
              value: 63,
            },
          ],
        },
        {
          type: 'text',
          name: 'last_name',
          label: 'Last Name',
          required: true,
          validations: [
            {
              name: 'regex',
              message: 'Only English characters are allowed.',
              value: '^[a-zA-Z0-9]*$',
            },
            {
              name: 'maxlength',
              message: 'Must be less than 64 characters.',
              value: 63,
            },
          ],
        },
        {
          type: 'email',
          name: 'email',
          label: 'Email',
          required: true,
          validations: [
            {
              name: 'regex',
              message: 'Only English characters are allowed.',
              value: '^[a-z0-9]+@[a-z0-9]+\\.[a-z]{2,}$',
            },
            {
              name: 'maxlength',
              message: 'Must be less than 47 characters.',
              value: 46,
            },
          ],
        },
        {
          type: 'phone',
          name: 'phone_number',
          label: 'Mobile number',
          required: true,
          validations: [
            {
              name: 'regex',
              message: 'Only numbers are allowed.',
              value: '^[0-9]+$',
            },
            {
              name: 'maxlength',
              message: 'Must be less than 47 characters.',
              value: 10,
            },
            {
              name: 'minlength',
              message: 'Must not be less than 4 characters.',
              value: 4,
            },
          ],
        },
        {
          type: 'password',
          name: 'password',
          label: 'Password',
          required: true,
          validations: [
            {
              name: 'maxlength',
              message: 'Must be less than 15 characters.',
              value: 15,
            },
            {
              name: 'minlength',
              message: 'Must not be less than 8 characters.',
              value: 8,
            },
            {
              name: 'regex',
              message: '1 or more numbers.',
              value: '^.*[0-9].*$',
            },
            {
              name: 'regex',
              message: '1 or more lower case letters.',
              value: '^.*[a-z].*$',
            },
            {
              name: 'regex',
              message: '1 or more upper case letters.',
              value: '^.*[A-Z].*$',
            },
          ],
        }]
      return ok(fields)
    }

    function register () {
      return ok()
    }

    // helper functions

    function ok (response?) {
      return of(new HttpResponse({ status: 200, body: response }))
    }

    function error (message) {
      return throwError({ error: { message } })
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
}
