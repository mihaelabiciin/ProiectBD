import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Locatie } from 'src/app/models/locatie';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hoteluri',
  templateUrl: './hoteluri.component.html',
  styleUrls: ['./hoteluri.component.css']
})
export class HoteluriComponent {
  locatii: Locatie[] = []; 
  selectedLocatie: Locatie | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    
  }
  ngOnInit() {
    this.getLocatii();
    
  }
  getLocatii() {
    return this.http.get(`${environment.baseUrl}/Locatii` ).subscribe(
      (result) => {
        console.log(result)
        this.locatii = result as Locatie[];
        console.log(this.locatii)
      },
      (error) => {
        // Handle errors here, such as displaying an error message
        this.snackBar.open("Nu se pot incarca locatiile");
      }
    );
  }

  addHotel() {
    //hotel: Hotel = new Hotel(nume, idLocatie..);
  }
}
