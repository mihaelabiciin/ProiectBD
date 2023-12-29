import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AutorizationService } from './services/autorization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Frontend';
  visibleHeader: boolean = true;

  constructor(private http: HttpClient, private authorizationService: AutorizationService) {
    
    this.visibleHeader = this.authorizationService.checkUser();
  }

  ngOnInit() {
    this.visibleHeader = this.authorizationService.checkUser();
  }
  getSomeData() {
  }

  hideBars(event: any) {
    this.visibleHeader = false;
  }
}
