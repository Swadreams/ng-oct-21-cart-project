import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface IUser {
  username?: String;
  email?: String;
  password: String;
}

interface IProfile {
  name: String;
  phone: String;
}

interface IAddress {
  title: String;
  addressLine1: String;
  addressLine2: String;
  city: String;
  zip: String;
  state: String;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(data: IUser) {
    return this.http.post(`${environment.baseUrl}/user/register`, data);
  }

  login(data: IUser) {
    return this.http.post(`${environment.baseUrl}/user/login`, data);
  }

  logout() {}

  getProfile() {
    return this.http.get(environment.baseUrl + '/user/profile');
  }

  updateProfile(data: IProfile) {
    return this.http.post(`${environment.baseUrl}/user/profile`, data);
  }

  updateAddress(data: IAddress[]) {
    return this.http.post(`${environment.baseUrl}/user/address`, data);
  }

  removeAddress(id: String) {
    return this.http.delete(`${environment.baseUrl}/user/address/${id}`);
  }
}
