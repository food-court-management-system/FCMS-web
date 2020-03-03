import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  backend = '/api/v1';
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  getInfo() {
    // return this.httpClient.get(`${this.backend}/detail`);
  }
}
