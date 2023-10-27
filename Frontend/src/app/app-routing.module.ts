import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LocatiiComponent } from './components/locatii/locatii.component';
import { HoteluriComponent } from './components/hoteluri/hoteluri.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';

const routes: Routes = [ 
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'locatii',
    component: LocatiiComponent
  },
  {
    path: 'hoteluri',
    component: HoteluriComponent
  },
  {
    path: 'restaurante',
    component: RestauranteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
