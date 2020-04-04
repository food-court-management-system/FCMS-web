import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../appsetting';

@Injectable({
  providedIn: 'root'
})
export class FoodstallStaffService {

  backend = AppSettings.BASEURL;
  constructor(private httpClient: HttpClient) {}

  getAllCartPending() {
    return this.httpClient.get(`${this.backend}/cart/pending`);
  }
}
