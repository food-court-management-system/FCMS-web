import {Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {HttpClient} from '@angular/common/http';
import {CustomerDto} from '../dtos/customer.dto';
import {User} from '../dtos/user.dto';
import {AppSettings} from '../appsetting';
import {FoodEntityDto} from '../dtos/food-entity.dto';
import {FoodStallEntityDto} from '../dtos/food-stall-entity.dto';
import {FoodTypeEntityDto} from '../dtos/food-type-entity.dto';

@Injectable({
  providedIn: 'root'
})
export class FsmanagerService {

  backend = AppSettings.BASEURL;
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  getAllFoodTypes() {
    return this.httpClient.get<FoodTypeEntityDto[]>(`${this.backend}/food-court/type/lists`);
  }

  getInfo(id: number) {
    return this.httpClient.get<FoodStallEntityDto>(`${this.backend}/food-stall/${id}/detail`);
  }

  getAllFSS(id: number) {
    return this.httpClient.get<User[]>(`${this.backend}/food-stall/${id}/food-stall-staff/list`);
  }

  deleteFSS(id: number) {
    return this.httpClient.put(`${this.backend}/food-court/food-stall-staff/${id}/delete`, null);
  }

  createFSS(data: User) {
    return this.httpClient.post(`${this.backend}/food-court/food-stall-staff/create`, data);
  }

  getAllFood(id: number) {
    return this.httpClient.get<FoodEntityDto[]>(`${this.backend}/food-stall/${id}/detail/menu`);
  }

  deleteFood(fsId: number, foodId: number) {
    return this.httpClient.delete(`${this.backend}/food-stall/${fsId}/food/${foodId}`);
  }

  getFoodInfo(fsId: number, id: number) {
    return this.httpClient.get<FoodEntityDto>(`${this.backend}/food-stall/${fsId}/food/${id}/detail`);
  }

  createNewFood(id: number, data: FormData) {
    return this.httpClient.post(`${this.backend}/food-stall/${id}/add/food`, data);
  }

  updateFood(fsId: number, id: number, data: FormData) {
    return this.httpClient.put(`${this.backend}/food-stall/${fsId}/food/${id}/edit`, data);
  }

  updateFS(id: number, data: FormData) {
    return this.httpClient.put(`${this.backend}/food-stall/${id}/edit`, data);
  }
}
