import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Camera } from 'src/app/models/camera';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private http: HttpClient) { }

  getCamere(): Observable<Camera[]> {
    return this.http.get(`${environment.baseUrl}/Camere`) as Observable<Camera[]>;
  }

  getCamereByHotelId(hotelId: number): Observable<Camera[]> {
    return this.http.get(`${environment.baseUrl}/Camere/hotel/` + hotelId) as Observable<Camera[]>;
  }

  getCameraById(id: number): Observable<Camera> {
    return this.http.get(`${environment.baseUrl}/Camere/${id}`) as Observable<Camera>;
  }

  addUpdateCamera(locatie: Camera): Observable<Camera> {
    return this.http.post(`${environment.baseUrl}/Camere`, locatie) as Observable<Camera>;
  }

  deleteCamera(id: number) {
    return this.http.delete(`${environment.baseUrl}/Camere/${id}`);
  }
}
