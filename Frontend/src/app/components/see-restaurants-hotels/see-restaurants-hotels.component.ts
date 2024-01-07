import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activitate } from 'src/app/models/activitate';
import { Hotel } from 'src/app/models/hotel';
import { Locatie } from 'src/app/models/locatie';
import { Restaurant } from 'src/app/models/restaurant';
import { ActivitateService } from 'src/app/services/activitate.service';
import { HotelService } from 'src/app/services/hotel.service';
import { LocatieService } from 'src/app/services/locatie.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

export class Checkbox {
  entityId: number;
  name: string;
  completed: boolean;

  constructor(entityId: number, name: string, completed: boolean) {
    this.entityId = entityId
    this.name = name;
    this.completed = completed;
  }
}

@Component({
  selector: 'app-see-restaurants-hotels',
  templateUrl: './see-restaurants-hotels.component.html',
  styleUrls: ['./see-restaurants-hotels.component.css']
})
export class SeeRestaurantsHotelsComponent {
  locationId: number | undefined;
  locatii: Locatie[] = [];
  hoteluri: Hotel[] = [];
  restaurante: Restaurant[] = [];
  activitati: Activitate[] = [];

  //filtered lists
  filteredHoteluri: Hotel[] = [];
  filteredRestaurante: Restaurant[] = [];
  filteredActivitati: Activitate[] = [];

  locatiiCheckboxes: Checkbox[] = [];
  isLoading: boolean = true;
  selectedEntity: 'hoteluri' | 'restaurante' | 'activitati' = 'restaurante';
  constructor(private route: ActivatedRoute, 
    private locatieService: LocatieService, 
    private hotelService: HotelService,
    private restaurantService: RestaurantService,
    private activitatiService: ActivitateService,
    private router: Router) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params['locationId']) {
        const locationId = JSON.parse(params['locationId']);
        this.locationId = locationId;
      }
    });

    this.computeLocations();
    this.computeHoteluri();
    this.computeRestaurante();
    this.computeActivitati();
  }

  computeLocations() {
    this.locatieService.getLocatii().subscribe(
      (locatii: Locatie[]) => {
        this.locatii = locatii;
        this.computeLocationsCheckboxes();
      }
    );
  }

  computeHoteluri() {
    this.hotelService.getHoteluri().subscribe(
      (hoteluri: Hotel[]) => {
        this.hoteluri = hoteluri;
        this.filteredHoteluri = hoteluri.filter(x => x.idLocatie == this.locationId)
      }
    );
  }

  computeRestaurante() {
    this.restaurantService.getRestaurante().subscribe(
      (restaurante: Restaurant[]) => {
        this.restaurante = restaurante;
        this.filteredRestaurante = restaurante.filter(x => x.idLocatie == this.locationId)
      }
    );
  }

  computeActivitati() {
    this.activitatiService.getActivitati().subscribe(
      (activitati: Activitate[]) => {
        this.activitati = activitati;
        this.filteredActivitati = activitati.filter(x => x.idLocatie == this.locationId)
      }
    );
  }

  computeLocationsCheckboxes() {
    let checkBoxes: Checkbox[] = [];
    this.locatii.forEach(element => {
      let checkbox: Checkbox = new Checkbox(element.idLocatie, element.nume, element.idLocatie == this.locationId);
      checkBoxes.push(checkbox);
    });

    this.locatiiCheckboxes = checkBoxes;
  }

  locationChecboxesChanged(checkbox: Checkbox) {
    const checkedLocationIds = this.locatiiCheckboxes
      .filter(checkbox => checkbox.completed)
      .map(checkbox => checkbox.entityId);

      this.filteredHoteluri = this.hoteluri.filter(hotel => checkedLocationIds.includes(hotel.idLocatie));
      this.filteredRestaurante = this.restaurante.filter(restaurante => checkedLocationIds.includes(restaurante.idLocatie));
      this.filteredActivitati = this.activitati.filter(activitati => checkedLocationIds.includes(activitati.idLocatie));
  }

  onChange() {
    console.log(this.selectedEntity)
  }

  getStarRange(numStars: number): number[] {
    return Array.from({ length: numStars }, (_, index) => index);
  }

  goToCamere(hotelId: number) {
    this.router.navigateByUrl('/camere?hotelId=' + hotelId);
  }
}
