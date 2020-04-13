import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../appsetting';

@Injectable({
  providedIn: 'root'
})
export class FoodstallStaffService {

  backend = AppSettings.BASEURL;
  constructor(private httpClient: HttpClient ) {}

  getAllCanceledItem(foodStallId) {
    return this.httpClient.get(`${this.backend}/food-stall/${foodStallId}/cancel-orders`);
  }

  getAllItemInProcess(foodStallId) {
    const param = new HttpParams().set('foodStallId', foodStallId);
    return this.httpClient.get(`${this.backend}/cart/process`, { params: param });
  }

  getCartItemDetail(cartItemId) {
    const param = new HttpParams().set('cartItemId', cartItemId);
    return this.httpClient.get(`${this.backend}/cart/detail`, { params: param });
  }

  updateOrderDetail(cartItemId, status) {
    const param = new HttpParams().set('cartItemId', cartItemId).set('status', status);
    return this.httpClient.put(`${this.backend}/cart/update`, null, { params: param });
  }

  cancelOrderDetail(data: any) {
    return this.httpClient.put(`${this.backend}/cart/cancel`, data);
  }
}
