import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  backend = '/api';
  constructor(private httpClient: HttpClient) {}

  checkLogin(data) {
    return this.httpClient.post(`${this.backend}/login`, data);
  }
}
