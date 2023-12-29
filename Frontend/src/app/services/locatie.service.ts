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
}
