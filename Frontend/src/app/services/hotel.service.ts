import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private http: HttpClient) { }

  getHoteluri(): Observable<Hotel[]> {
    return this.http.get(`${environment.baseUrl}/Hoteluri`) as Observable<Hotel[]>;
  }

  getHotelById(id: number): Observable<Hotel> {
    return this.http.get(`${environment.baseUrl}/Hoteluri/${id}`) as Observable<Hotel>;
  }

  addUpdateHotel(locatie: Hotel): Observable<Hotel> {
    return this.http.post(`${environment.baseUrl}/Hoteluri`, locatie) as Observable<Hotel>;
  }

  deleteHotel(id: number) {
    return this.http.delete(`${environment.baseUrl}/Hoteluri/${id}`);
  }
}
