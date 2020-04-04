import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthenticationService} from './authentication.service';
import {AllFSManagerDto} from '../dtos/allFSManager.dto';
import {CustomerDto} from '../dtos/customer.dto';
import {WalletDto} from '../dtos/wallet.dto';

@Injectable({
  providedIn: 'root'
})
export class CashierService {

  backend = '/api';
  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {}

  getAllFacebookCustomer() {
    return this.httpClient.get<CustomerDto[]>(`${this.backend}/customer/facebook/lists`);
  }

  getAllGoogleCustomer() {
    return this.httpClient.get<CustomerDto[]>(`${this.backend}/customer/google/lists`);
  }

  updateBalance(id: number, balance: string, assert: string) {
    const param = new HttpParams().set('assert', assert).set('balance', balance);
    return this.httpClient.put(`${this.backend}/customer/wallet/${id}/edit`, {params: param} );
    // return this.httpClient.put(`${this.backend}/customer/wallet/${id}/edit`, null, {params: param} );
  }

  getWalletDetail(id: number) {
    return this.httpClient.get<WalletDto>(`${this.backend}/customer/${id}/wallet/detail`);
  }

}
