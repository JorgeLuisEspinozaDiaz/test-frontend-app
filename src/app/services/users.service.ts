import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://fd294k2ag1.execute-api.us-east-1.amazonaws.com/api/';
  constructor(private http: HttpClient) {
   }

 getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}user`);
  }
}
