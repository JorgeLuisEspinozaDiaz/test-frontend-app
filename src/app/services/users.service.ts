import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://1r3w90y2fa.execute-api.us-east-1.amazonaws.com/api/';
  constructor(private http: HttpClient) {
   }

 getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}user`);
  }
}
