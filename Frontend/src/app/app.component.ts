import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Frontend';

  constructor(private http: HttpClient) {}

  getSomeData() {
    return this.http.get(`${environment.baseUrl}/Locatii`).subscribe();
  }
}
