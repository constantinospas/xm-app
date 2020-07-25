import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ApiService {
  constructor (private http: HttpClient) { }

  public getForm () {
    return this.http.get('/form')
  }

  public postSignUp (user) {
    return this.http.post('/signup', { user })
  }
}
