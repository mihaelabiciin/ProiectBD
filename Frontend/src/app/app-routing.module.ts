import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LocatiiComponent } from './components/locatii/locatii.component';
import { HoteluriComponent } from './components/hoteluri/hoteluri.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';
import { PlanTripComponent } from './components/plan-trip/plan-trip.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuard } from './auth.guard';
import { SeeRestaurantsHotelsComponent } from './components/see-restaurants-hotels/see-restaurants-hotels.component';
import { ActivitatiComponent } from './components/activitati/activitati.component';
import { CamereComponent } from './components/camere/camere.component';
import { BasketComponent } from './components/basket/basket.component';

const routes: Routes = [ 
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'locatii',
    component: LocatiiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'hoteluri',
    component: HoteluriComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'restaurante',
    component: RestauranteComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'activitati',
    component: ActivitatiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'plan-trip',
    component: PlanTripComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'restaurante-hotele',
    component: SeeRestaurantsHotelsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'camere',
    component: CamereComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'vacanta-ta',
    component: BasketComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
