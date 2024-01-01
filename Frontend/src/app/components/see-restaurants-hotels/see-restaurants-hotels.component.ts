import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Locatie } from 'src/app/models/locatie';
import { LocatieService } from 'src/app/services/locatie.service';

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
  locatiiCheckboxes: Checkbox[] = [];
  isLoading: boolean = true;
  constructor(private route: ActivatedRoute, private locatieService: LocatieService) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params['locationId']) {
        const locationId = JSON.parse(params['locationId']);
        this.locationId = locationId;
      }
    });

    this.computeLocations();
  }

  computeLocations() {
    this.locatieService.getLocatii().subscribe(
      (locatii: Locatie[]) => {
        this.locatii = locatii;
        this.computeLocationsCheckboxes();
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
    //update the results
  }
}
