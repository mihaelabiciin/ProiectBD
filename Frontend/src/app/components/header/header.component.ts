import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizationService } from 'src/app/services/autorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userType: string;
  selectUserType(userType: string) {
    this.autorizationService.changeAdminRights(userType);
    this.userType = userType;

    if (userType == "Admin")
      this.router.navigate(['/locatii']);
    else 
      this.router.navigate(['/home']);
  }

  constructor(public autorizationService: AutorizationService, 
    private router: Router) {
    this.userType = autorizationService.getAdminRights()? "Admin" : "User";
  }
}
