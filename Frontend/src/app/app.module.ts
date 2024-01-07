import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LocatiiComponent } from './components/locatii/locatii.component';
import { HoteluriComponent } from './components/hoteluri/hoteluri.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgSelectModule } from '@ng-select/ng-select';
import { PlanTripComponent } from './components/plan-trip/plan-trip.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { SeeRestaurantsHotelsComponent } from './components/see-restaurants-hotels/see-restaurants-hotels.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditLocatieModalComponent } from './components/edit-locatie-modal/edit-locatie-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmModalComponent } from './components/delete-confirm-modal/delete-confirm-modal.component';
import { MatSortModule } from '@angular/material/sort';
import { ActivitatiComponent } from './components/activitati/activitati.component';
import { AddEditRestaurantComponent } from './components/add-edit-modals/add-edit-restaurant/add-edit-restaurant.component';
import { CamereComponent } from './components/camere/camere.component';
import { AddEditHotelComponent } from './components/add-edit-modals/add-edit-hotel/add-edit-hotel.component';
import { BasketComponent } from './components/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomePageComponent,
    LocatiiComponent,
    HoteluriComponent,
    RestauranteComponent,
    PlanTripComponent,
    LoginPageComponent,
    SeeRestaurantsHotelsComponent,
    EditLocatieModalComponent,
    DeleteConfirmModalComponent,
    ActivitatiComponent,
    AddEditRestaurantComponent,
    AddEditHotelComponent,
    CamereComponent,
    BasketComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatMenuModule,
    FormsModule,
    MatSnackBarModule,
    NgSelectModule,
    // NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
