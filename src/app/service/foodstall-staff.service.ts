import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodstallStaffService {

  backend = '/api';
  constructor(private httpClient: HttpClient) {}

  getAllCartPending() {
    return this.httpClient.get(`${this.backend}/cart/pending`);
  }
}
