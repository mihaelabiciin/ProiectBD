import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Locatie } from 'src/app/models/locatie';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-add-edit-restaurant',
  templateUrl: './add-edit-restaurant.component.html',
  styleUrls: ['./add-edit-restaurant.component.css']
})
export class AddEditRestaurantComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { restaurant: Restaurant, mode: string, locatii?: any },
    public dialogRef: MatDialogRef<AddEditRestaurantComponent>,
    public restaurantService: RestaurantService) {

  }
  selectedImage: any | undefined = undefined;
  selectedLocatie: Locatie | undefined = undefined;
  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): Restaurant {
    this.data.restaurant.idLocatie = this.selectedLocatie?.idLocatie!;
    // this.saveImage();
    return this.data.restaurant;
  }

  ngOnInit(): void {
    this.selectedLocatie = this.data.locatii.filter((locatie: Locatie) => locatie.idLocatie === this.data.restaurant.idLocatie)[0];
  }

  onLocatieChange(event: any) {
    this.selectedLocatie = event;
  } onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result as string;
        this.selectedImage = imageDataUrl;
      };
      reader.readAsDataURL(file);
    }
  }

  saveImage() {
    // Parameters for creating a custom path
    const locationName = 'your_location';
    const hotelName = 'your_hotel';
    const roomName = 'your_room';

    this.restaurantService.saveImage(locationName, hotelName, roomName, this.selectedImage).subscribe(
      () => {}
    );
  }

  dataURItoBlob(dataURI: string): Blob | undefined {
    if (dataURI != '' && dataURI != null && dataURI != undefined) {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ab], { type: mimeString });
    }
    return undefined;
  }
}
