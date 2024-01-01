import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Locatie } from '../models/locatie';

@Injectable({
  providedIn: 'root'
})
export class LocatieService {

  constructor(private http: HttpClient) { }

  getLocatii(): Observable<Locatie[]> {
    return this.http.get(`${environment.baseUrl}/Locatii`) as Observable<Locatie[]>;
  }

  getLocatieById(id: number): Observable<Locatie> {
    return this.http.get(`${environment.baseUrl}/Locatii/${id}`) as Observable<Locatie>;
  }

  addUpdateLocatie(locatie: Locatie): Observable<Locatie> {
    return this.http.post(`${environment.baseUrl}/Locatii`, locatie) as Observable<Locatie>;
  }
  // updateLocatie(id: number, locatie: Locatie): Observable<Locatie> {
  //   return this.http.put(`${environment.baseUrl}/Locatii/${id}`, locatie) as Observable<Locatie>;
  // }

  deleteLocatie(id: number) {
    return this.http.delete(`${environment.baseUrl}/Locatii/${id}`);
  }
}
