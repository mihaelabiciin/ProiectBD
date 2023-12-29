import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Locatie } from 'src/app/models/locatie';

@Component({
  selector: 'app-see-restaurants-hotels',
  templateUrl: './see-restaurants-hotels.component.html',
  styleUrls: ['./see-restaurants-hotels.component.css']
})
export class SeeRestaurantsHotelsComponent {
  locationId: number | undefined;
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params['locationId']) {
        const locationId = JSON.parse(params['locationId']);
        this.locationId = locationId;
        console.log(locationId);
      }
    });
  }
}
