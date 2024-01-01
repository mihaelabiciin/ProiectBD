import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  getRestaurante(): Observable<Restaurant[]> {
    return this.http.get(`${environment.baseUrl}/Restaurante`) as Observable<Restaurant[]>;
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get(`${environment.baseUrl}/Restaurante/${id}`) as Observable<Restaurant>;
  }

  addUpdateRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post(`${environment.baseUrl}/Restaurante`, restaurant) as Observable<Restaurant>;
  }

  deleteRestaurant(id: number) {
    return this.http.delete(`${environment.baseUrl}/Restaurante/${id}`);
  }
}
