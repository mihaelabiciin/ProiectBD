import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Locatie } from 'src/app/models/locatie';
import { LocatieService } from 'src/app/services/locatie.service';

@Component({
  selector: 'app-plan-trip',
  templateUrl: './plan-trip.component.html',
  styleUrls: ['./plan-trip.component.css']
})
export class PlanTripComponent {

  locatii: Locatie[] = [];

  constructor(locatieService: LocatieService, private snackBar: MatSnackBar, private router: Router) {
    locatieService.getLocatii().subscribe(
      (result) => {
        this.locatii = result as Locatie[];
      },
      (error) => {
        this.snackBar.open("Nu se pot incarca locatiile");
      }
    );
  }
  ngOnInit() {
  }

  goToSeeRestaurantsHotels(location: Locatie) {
      this.router.navigate(['/restaurante-hotele'], {
      queryParams: { locationId: JSON.stringify(location.idLocatie) }
    });
  }
}
