import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Locatie } from 'src/app/models/locatie';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocatieService } from 'src/app/services/locatie.service';
import { MatDialog } from '@angular/material/dialog';
import { EditLocatieModalComponent } from '../edit-locatie-modal/edit-locatie-modal.component';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-locatii',
  templateUrl: './locatii.component.html',
  styleUrls: ['./locatii.component.css']
})
export class LocatiiComponent {

  addError: string = "";
  locatii: Locatie[] = [];
  displayedColumns: string[] = ['id', 'nume', 'descriere', 'actions'];
  dataSource = new MatTableDataSource<Locatie>();

  //form
  nume: string = "";
  descriere: string | null = null;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private locatieService: LocatieService, private dialog: MatDialog) {
    this.getLocatii();
  }


  getLocatii() {
    this.locatieService.getLocatii().subscribe(
      (result) => {
        this.locatii = result as Locatie[];
      },
      (error) => {
        this.snackBar.open("Nu se pot incarca locatiile");
      }
    );
  }

  addLocatie() {
    const dialogRef = this.dialog.open(EditLocatieModalComponent, {
      data: { locatie: null, mode: 'add' }
    });

    dialogRef.afterClosed().subscribe((result: Locatie) => {
      if (result) {
        this.locatieService.addUpdateLocatie(result).subscribe(result =>
          {
            this.snackBar.open('Locatie adaugata cu succes', 'Close', {
              duration: 3000, // Set duration to 3000 milliseconds (3 seconds)
            });
            this.getLocatii();
          },
          (error) => {
            this.snackBar.open(error, 'Close', {
              duration: 3000, // Set duration to 3000 milliseconds (3 seconds)
            });
          }
        );
      }

    });
  }

  editLocatie(locatie: Locatie) {
      const dialogRef = this.dialog.open(EditLocatieModalComponent, {
        data: { locatie: locatie, mode: 'edit' }
      });

      dialogRef.afterClosed().subscribe((result: Locatie) => {
        if (result) {
          this.locatieService.addUpdateLocatie(result).subscribe(result =>
            {});
          // Handle the result after the modal is closed (if needed)
          console.log('The dialog was closed', result);
        }

      });
    }

  deleteLocatie(locatie: Locatie) {
      const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
        data:
        {
          entity: locatie,
          type: 'locatia',
        } 
      });

      dialogRef.afterClosed().subscribe((deleteLocatie: boolean) => {
        if (deleteLocatie == true) {
          this.locatieService.deleteLocatie(locatie.idLocatie).subscribe(() =>
            this.getLocatii())
        }
      });
    }
}
