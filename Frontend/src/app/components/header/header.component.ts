import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizationService } from 'src/app/services/autorization.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Output() hideBars = new EventEmitter<void>();

  userEmail: string | null;

  constructor(public authorizationService: AutorizationService, 
    private router: Router) {
    this.userEmail = localStorage.getItem('userToken');
  }

  editProfile() {
    //redirect to edit user page
  }

  logout() {
    this.authorizationService.setUser(undefined);
    this.router.navigateByUrl('/login');
    this.hideBars.emit();
  }
}
