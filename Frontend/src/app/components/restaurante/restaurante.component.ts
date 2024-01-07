import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Locatie } from 'src/app/models/locatie';
import { Restaurant } from 'src/app/models/restaurant';
import { LocatieService } from 'src/app/services/locatie.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
import { AddEditRestaurantComponent } from '../add-edit-modals/add-edit-restaurant/add-edit-restaurant.component';

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

  constructor(private restaurantService: RestaurantService, private locatieService: LocatieService, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.getLocatii();
  }

  getLocatii() {
    this.locatieService.getLocatii().subscribe(
      (result) => {
        this.locatii = result as Locatie[];
        this.getRestaurante();
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
        this.restuaurante.forEach(restuaurant => {
          restuaurant.locatie = this.locatii.filter((locatie) => locatie.idLocatie == restuaurant.idLocatie)[0]
        });
      },
      (error) => {
        this.snackBar.open("Nu se pot incarca restaurantele");
      }
    )
  }

  addRestaurant() {
    let restaurant: Restaurant = new Restaurant();
    const dialogRef = this.dialog.open(AddEditRestaurantComponent, {
      data: {restaurant, mode: 'add', locatii: this.locatii}
      
    });

    dialogRef.afterClosed().subscribe((deleteleRestaurant: Restaurant) => {
      if (deleteleRestaurant != null) {
        this.restaurantService.addUpdateRestaurant(restaurant).subscribe(() => {
        })
      }
      this.getRestaurante();
    });
  }

  editRestaurant(restaurant: Restaurant) {
    const dialogRef = this.dialog.open(AddEditRestaurantComponent, {
      data: {restaurant, mode: 'edit', locatii: this.locatii}
         
    });

    dialogRef.afterClosed().subscribe((deleteleRestaurant: Restaurant) => {
      if (deleteleRestaurant != null) {
        this.restaurantService.addUpdateRestaurant(restaurant).subscribe(() => {
        })
      } else {
        this.getRestaurante();
      }
    });
  }

  deleteRestaurant(restaurant: Restaurant) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data:
        {
          entity: restaurant,
          type: 'restaurant',
        } 
    });

    dialogRef.afterClosed().subscribe((deleteleRestaurant: boolean) => {
      if (deleteleRestaurant == true) {
        this.restaurantService.deleteRestaurant(restaurant.idRestaurant).subscribe(() =>
          this.getRestaurante())
      }
    });
  }

}
