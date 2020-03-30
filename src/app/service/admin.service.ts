import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {User} from '../dtos/user.dto';
import {AllFSManagerDto} from '../dtos/allFSManager.dto';
import {FoodStallDto} from '../dtos/foodStall.dto';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  backend = '/api';
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  getInfo() {
    // return this.httpClient.get(`${this.backend}/detail`);
  }

  createNewCashier(user: User) {
    return this.httpClient.post(`${this.backend}/food-court/cashier/create`, user);
  }

  getAllCashier() {
    return this.httpClient.get<User[]>(`${this.backend}/food-court/cashier/lists`);
  }

  getAllFSManager() {
    return this.httpClient.get<AllFSManagerDto[]>(`${this.backend}/food-court/food-stall-manager/lists`);
  }

  getAllFS() {
    return this.httpClient.get<FoodStallDto[]>(`${this.backend}/food-stall/lists`);
  }

  deleteCashier(id: number) {
    return this.httpClient.put(`${this.backend}/food-court/cashier/${id}/delete`, null);
  }

  // Hàm chưa có
  createNewFoodStall(data: FormData) {
    return this.httpClient.post(`${this.backend}/food-stall/create`, data);
  }


}
