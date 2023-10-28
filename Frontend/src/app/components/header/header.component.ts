import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  userType: string = "Admin"
  selectUserType(userType: string) {
    this.userType = userType;
  }
}
