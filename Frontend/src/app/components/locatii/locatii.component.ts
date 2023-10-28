import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Locatie } from 'src/app/models/locatie';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-locatii',
  templateUrl: './locatii.component.html',
  styleUrls: ['./locatii.component.css']
})
export class LocatiiComponent {

  addError: string = "";
  locatii: Locatie[] = []; 

  //form
  nume: string = "";
  descriere: string | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.getLocatii();
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

  addLocatie() {

    if (this.nume == "")
    {
      this.addError = "Te rog adauga un nume!"
    }
    let locatie : Locatie = new Locatie(this.nume, this.descriere);
    return this.http.post(`${environment.baseUrl}/Locatii`, locatie ).subscribe(
      () => {
        this.snackBar.open('Post Successful');
        this.getLocatii();
      },
      (error) => {
        this.snackBar.open(error);
      }
    );
    
  }
}
