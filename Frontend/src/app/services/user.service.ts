import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AutorizationService } from './autorization.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private autorizationService: AutorizationService) { }

  register(userModel: User): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/users`, userModel);
  }

  login(loginModel: any): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/users/Login`, loginModel);
  }
}
