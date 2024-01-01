import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hotel } from 'src/app/models/hotel';
import { Locatie } from 'src/app/models/locatie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hoteluri',
  templateUrl: './hoteluri.component.html',
  styleUrls: ['./hoteluri.component.css']
})
export class HoteluriComponent {
  hoteluri: Hotel[] = []; 
  locatii: Locatie[] = [];
  selectedLocatie: Locatie | null = null;
  displayedColumns: string[] = ['id', 'nume','numarStele', 'notaRecenzieHotel', 'adresa', 'contact', 'micDejun', 'pretMicDejun', 'IdLocatie', 'actions'];

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    
  }
  ngOnInit() {
    this.getHoteluri();
    
  }

  getLocatii() {
    return this.http.get(`${environment.baseUrl}/Locatii` ).subscribe(
      (result) => {
        this.locatii = result as Locatie[];
      },
      (error) => {
        // Handle errors here, such as displaying an error message
        this.snackBar.open("Nu se pot incarca locatiile");
      }
    );
  }
  getHoteluri() {
    return this.http.get(`${environment.baseUrl}/Hoteluri` ).subscribe(
      (result) => {
        this.hoteluri = result as Hotel[];
      },
      (error) => {
        // Handle errors here, such as displaying an error message
        this.snackBar.open("Nu se pot incarca hotelurile");
      }
    );
  }

  addHotel() {
    //hotel: Hotel = new Hotel(nume, idLocatie..);
  }

  editHotel() {

  }

  deleteHotel() {}
}
