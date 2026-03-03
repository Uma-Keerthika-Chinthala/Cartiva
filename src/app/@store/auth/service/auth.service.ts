import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationRequest } from '../state/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loginApiUrl = '/login'
  constructor(private http: HttpClient) { }

  login(payload: AuthenticationRequest){
    return this.http.post<any>(this.loginApiUrl, payload)
  }

}
