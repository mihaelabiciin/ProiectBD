import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel } from 'src/app/models/hotel';
import { Locatie } from 'src/app/models/locatie';
import { environment } from 'src/environments/environment';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
import { HotelService } from 'src/app/services/hotel.service';
import { AddEditHotelComponent } from '../add-edit-modals/add-edit-hotel/add-edit-hotel.component';

@Component({
  selector: 'app-hoteluri',
  templateUrl: './hoteluri.component.html',
  styleUrls: ['./hoteluri.component.css']
})
export class HoteluriComponent {
  hoteluri: Hotel[] = [];
  locatii: Locatie[] = [];
  selectedLocatie: Locatie | null = null;
  displayedColumns: string[] = ['id', 'nume', 'numarStele', 'notaRecenzieHotel', 'adresa', 'contact', 'micDejun', 'pretMicDejun', 'IdLocatie', 'actions'];

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private dialog: MatDialog, public hotelService: HotelService) {

  }
  ngOnInit() {
    this.getLocatii();
  }

  getLocatii() {
    return this.http.get(`${environment.baseUrl}/Locatii`).subscribe(
      (result) => {
        this.locatii = result as Locatie[];
        this.getHoteluri();
      },
      (error) => {
        // Handle errors here, such as displaying an error message
        this.snackBar.open("Nu se pot incarca locatiile");
      }
    );
  }
  getHoteluri() {
    return this.http.get(`${environment.baseUrl}/Hoteluri`).subscribe(
      (result) => {
        this.hoteluri = result as Hotel[];
        this.hoteluri.forEach(hotel => {
          hotel.locatie = this.locatii.filter((locatie) => locatie.idLocatie == hotel.idLocatie)[0];
        });
      },
      (error) => {
        // Handle errors here, such as displaying an error message
        this.snackBar.open("Nu se pot incarca hotelurile");
      }
    );
  }

  addHotel() {
    let hotel: Hotel = new Hotel();
    const dialogRef = this.dialog.open(AddEditHotelComponent, {
      data: {hotel, mode: 'add', locatii: this.locatii}
      
    });

    dialogRef.afterClosed().subscribe((newHotel: Hotel) => {
      if (newHotel != null) {
        this.hotelService.addUpdateHotel(newHotel).subscribe(() => {
          this.getHoteluri();
        })
      }
      
    });
  }

  editHotel(hotel: Hotel) {
    const dialogRef = this.dialog.open(AddEditHotelComponent, {
      data: {hotel, mode: 'edit', locatii: this.locatii}
         
    });

    dialogRef.afterClosed().subscribe((editedHotel: Hotel) => {
      if (editedHotel != null) {
        this.hotelService.addUpdateHotel(editedHotel).subscribe(() => {
        })
      } else {
        this.getHoteluri();
      }
    });
  }

  deleteHotel(hotel: Hotel) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data:
        {
          entity: hotel,
          type: 'hotelul',
        } 
    });

    dialogRef.afterClosed().subscribe((deleteLocatie: boolean) => {
      if (deleteLocatie == true) {
        this.hotelService.deleteHotel(hotel.idHotel).subscribe(() =>
          this.getHoteluri())
      }
    });
  }
}
