import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera } from 'src/app/models/camera';
import { Hotel } from 'src/app/models/hotel';
import { CameraService } from 'src/app/services/camera.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-camere',
  templateUrl: './camere.component.html',
  styleUrls: ['./camere.component.css']
})
export class CamereComponent {
  constructor(private route: ActivatedRoute,
    private cameraService: CameraService,
    private router: Router, private hotelService: HotelService) {

  }
  camere: Camera[] = [];
  filteredCamere: Camera[] = [];
  hotelId: any;
  hotel: Hotel | undefined;
  vreaAerConditionat: boolean = true;
  vreaWifi: boolean = true;
  vreaCameraSimpla: boolean = true;
  vreaCameraDubla: boolean = true;
  vreaTot: boolean = true;
  vreaBalcon: boolean = true;
  vreaFrigider: boolean = true;

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params['hotelId']) {
        const hotelId = JSON.parse(params['hotelId']);
        this.hotelId = hotelId;
        this.cameraService.getCamereByHotelId(this.hotelId).subscribe((response) => {
          this.camere = response;
          this.filteredCamere = this.camere;
        });

        this.hotelService.getHotelById(this.hotelId).subscribe(
          (hotel: Hotel) => {
            this.hotel = hotel;
            this.camere.forEach(camera => {
              camera.hotel = hotel;
            });
          }
        )
      }
    });
  }

  fiterByRoomType(camere: Camera[]) {
    if (this.vreaCameraSimpla && this.vreaCameraDubla) {
      return camere;
    }
    if (this.vreaCameraSimpla) {
      return camere.filter((camera) => camera.tip.toLocaleLowerCase() === 'single')
    }
    if (this.vreaCameraDubla) {
      return camere.filter((camera) => camera.tip.toLocaleLowerCase() === 'double')
    }
    return camere;
  }

  fitreazaCamere(event?: any) {
    if (!event.checked) {
      this.vreaTot = event.checked;
    } else {
      if (this.vreaAerConditionat && this.vreaBalcon && this.vreaFrigider && this.vreaWifi && this.vreaCameraDubla && this.vreaCameraSimpla) {
        this.vreaTot = event.checked;
      }
    }
    this.filteredCamere = this.camere;
    if (this.vreaTot) {
      return;
    }

    this.filteredCamere = this.fiterByRoomType(this.filteredCamere);

    if (this.vreaAerConditionat) {
      this.filteredCamere = this.filteredCamere.filter(x => x.aerConditionat);
    }

    if (this.vreaBalcon) {
      this.filteredCamere = this.filteredCamere.filter(x => x.balcon);
    }

    if (this.vreaFrigider) {
      this.filteredCamere = this.filteredCamere.filter(x => x.frigider);
    }

    if (this.vreaWifi) {
      this.filteredCamere = this.filteredCamere.filter(x => x.wifi);
    }
  }

  toateChecked() {
    if (this.vreaTot) {
      this.vreaCameraSimpla = true;
      this.vreaCameraDubla = true;
      this.vreaAerConditionat = true;
      this.vreaBalcon = true;
      this.vreaWifi = true;
      this.vreaFrigider = true;
    }
    else {
      this.vreaCameraSimpla = false;
      this.vreaCameraDubla = false;
      this.vreaAerConditionat = false;
      this.vreaBalcon = false;
      this.vreaWifi = false;
      this.vreaFrigider = false;
    }

    this.fitreazaCamere();
  }

  addToCos(camera: Camera) {
    const cameraListString = localStorage.getItem('basket_camere');
    const cameraJsonString = JSON.stringify(camera);
    if (cameraListString) {
      // Parse the JSON string into a JavaScript object
      const cameraList = JSON.parse(cameraListString);
      cameraList.push(cameraJsonString);

      // Convert the updated array back to a JSON string
      const updatedCameraListString = JSON.stringify(cameraList);
      // Update the localStorage with the updated JSON string
      localStorage.setItem('basket_camere', updatedCameraListString);

    } else {
      const newCameraList = [cameraJsonString];
      // Convert the new array to a JSON string
      const newCameraListString = JSON.stringify(newCameraList);

      // Update the localStorage with the new JSON string
      localStorage.setItem('basket_camere', newCameraListString);
    }
  }
}
