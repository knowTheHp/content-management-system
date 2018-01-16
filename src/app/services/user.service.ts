import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  registerUrl: any = 'http://localhost:3000/users/register';
  loginUrl: any = 'http://localhost:3000/users/login';
  register(user) {
    return this.http.post(this.registerUrl, user).map(res => res.json());
  }

  login(user) {
    return this.http.post(this.loginUrl, user).map(res => res.json());
  }
}
