import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorizationService {
  private userStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userStatus$: Observable<boolean> = this.userStatusSubject.asObservable();


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
      this.userStatusSubject.next(false);
      return false;
    }
    this.userStatusSubject.next(true);
    return true;
  }

  setUser(email: string | undefined) {
    if (email == undefined)
    {
      localStorage.removeItem('userToken');
    }
    else {
      localStorage.setItem('userToken', email);
    }
  }
}
