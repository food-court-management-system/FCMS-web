import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient} from '@angular/common/http';
import {CustomerDto} from '../dtos/customer.dto';
import {User} from '../dtos/user.dto';
import { AppSettings } from '../appsetting';

@Injectable({
  providedIn: 'root'
})
export class FsmanagerService {

  backend = AppSettings.BASEURL;
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  getAllFSS() {
    return this.httpClient.get<User[]>(`${this.backend}/food-court/food-stall-staff/lists`);
  }

  deleteFSS(id: number) {
    return this.httpClient.put(`${this.backend}/food-court/food-stall-staff/${id}/delete`, null);
  }
}
