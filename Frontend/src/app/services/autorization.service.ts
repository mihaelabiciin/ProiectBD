import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutorizationService {

  isAdmin: boolean = localStorage.getItem('isAdmin') == 'true';

  constructor(private router: Router) { 
  }

  changeAdminRights(type: string) {
    if (type.toLowerCase() == 'admin')
      this.isAdmin = true;
    else
      this.isAdmin = false;
    localStorage.setItem('isAdmin', this.isAdmin + "")
  }

  getAdminRights() {
    return this.isAdmin;
  }

  checkUser() {
    if (localStorage.getItem('userToken') === null) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  setUser(email: string | undefined) {
    console.log(email);
    if (email == undefined)
    {
      localStorage.removeItem('userToken');
    }
    else {
      localStorage.setItem('userToken', email);
    }
  }
}
