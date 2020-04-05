import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../dtos/user.dto';
import {map} from 'rxjs/operators';
import { AppSettings } from '../appsetting';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  backend: string = AppSettings.BASEURL;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(data) {
    return this.http.post<any>(`${this.backend}/user/login`, data)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  updateProfile(dataUpdate) {
    return this.http.put(`${this.backend}/user/profile`, dataUpdate)
  }

  changePassword(userChange) {
    return this.http.put(`${this.backend}/user/change-password`, userChange)
  }

  getProfile(username) {
    const param = new HttpParams().set('username', username);
    return this.http.get<any>(`${this.backend}/user/profile`, {params: param});
  }
}
