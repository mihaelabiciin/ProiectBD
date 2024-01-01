// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AutorizationService } from './services/autorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private permittedPaths: string[] = ['home', 'plan-trip', 'restaurante-hotele'];
  constructor(private authorizationService: AutorizationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Implement your logic to check user's permission
    const isNonAdmin = !this.authorizationService.isAdmin;
    const currentRoute = route.routeConfig?.path;

    if (currentRoute == '' && localStorage.getItem('userToken') != null)
    {
      this.router.navigateByUrl(isNonAdmin? '/home': 'locatii');
    }
    else if (currentRoute == '')  
    {
      this.router.navigate(['/login']);
    }
    
    if (isNonAdmin && !this.permittedPaths.includes(currentRoute!)) {
      if (localStorage.getItem('userToken') != null)
        this.router.navigate(['/home']);
      else 
        this.router.navigate(['/login']);
      return false;
    }
    else if(!isNonAdmin && this.permittedPaths.includes(currentRoute!)){
      if (localStorage.getItem('userToken') != null) 
        this.router.navigate(['/locatii']);
      else 
        this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
