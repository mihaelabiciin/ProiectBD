import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizationService {

  isAdmin: boolean = localStorage.getItem('isAdmin') == 'true';

  constructor() { 
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
}
