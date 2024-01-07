import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Activitate } from '../models/activitate';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivitateService {

  constructor(private http: HttpClient) { }

  getActivitati(): Observable<Activitate[]> {
    return this.http.get(`${environment.baseUrl}/Activitati`) as Observable<Activitate[]>;
  }

  getActivitatiById(id: number): Observable<Activitate> {
    return this.http.get(`${environment.baseUrl}/Activitati/${id}`) as Observable<Activitate>;
  }

  addUpdateActivitati(activitate: Activitate): Observable<Activitate> {
    return this.http.post(`${environment.baseUrl}/Activitati`, activitate) as Observable<Activitate>;
  }

  deleteActivitati(id: number) {
    return this.http.delete(`${environment.baseUrl}/Activitati/${id}`);
  }
}
