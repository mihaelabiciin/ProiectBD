import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activitate } from 'src/app/models/activitate';
import { Camera } from 'src/app/models/camera';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent {

  constructor(private route: ActivatedRoute,
    private router: Router) {
  }

  camere: Camera[] = [];
  restaurante: Restaurant[] = [];
  activitati: Activitate[] = [];
  totalPrice: number = 0;

  ngOnInit() {
    const cameraListString = localStorage.getItem('basket_camere');
    if (cameraListString != undefined) {
      const cameraList = JSON.parse(cameraListString);
      this.camere = cameraList.map((cameraData : any) => new Camera(JSON.parse(cameraData)));
    }
    const restauranteListString = localStorage.getItem('basket_restaurante');
    if (restauranteListString != undefined) {
      const cameraList = JSON.parse(restauranteListString);
      this.restaurante = cameraList.map((restaurantData : any) => new Restaurant(JSON.parse(restaurantData)));
    }
    const activitatiListString = localStorage.getItem('basket_activitati');
    if (activitatiListString != undefined) {
      const cameraList = JSON.parse(activitatiListString);
      this.activitati = cameraList.map((activitateData : any) => new Activitate(JSON.parse(activitateData)));
    }

    this.computeTotal();
  }

  computeTotal() {
    this.totalPrice = 0;
    this.camere.forEach(camera => {
      this.totalPrice += camera.pret;
    });
    this.restaurante.forEach(restaurant => {
      this.totalPrice += restaurant.pret;
    });
    this.activitati.forEach(activitate => {
      this.totalPrice += activitate.pret;
    });
  }

  removeCamera(index: number) {
    this.camere.splice(index, 1);
    const stringList = this.camere.map((camera) => JSON.stringify(camera))
    localStorage.setItem('basket_camere', JSON.stringify(stringList));
    this.computeTotal();
  }
}
