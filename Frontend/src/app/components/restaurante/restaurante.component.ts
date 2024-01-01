import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Locatie } from 'src/app/models/locatie';
import { Restaurant } from 'src/app/models/restaurant';
import { LocatieService } from 'src/app/services/locatie.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent {
  locatii: Locatie[] = [];
  restuaurante: Restaurant[] = []
  selectedLocatie: Locatie | null = null;
  displayedColumns: string[] = ['id', 'nume','notaRecenzie', 'adresa', 'contact', 'specificRestaurant', 'idLocatie', 'actions'];

  constructor(private restaurantService: RestaurantService, private locatieService: LocatieService, private snackBar: MatSnackBar) {
    this.getLocatii();
    this.getRestaurante();
  }

  getLocatii() {
    this.locatieService.getLocatii().subscribe(
      (result) => {
        this.locatii = result as Locatie[];
      },
      (error) => {
        this.snackBar.open("Nu se pot incarca locatiile");
      }
    );
  }

  getRestaurante() {
    this.restaurantService.getRestaurante().subscribe(
      (result) => {
        this.restuaurante = result
      },
      (error) => {
        this.snackBar.open("Nu se pot incarca restaurantele");
      }
    )
  }

  addRestaurant() {

  }

  editRestaurant() {

  }

  deleteRestaurant() {

  }

}
