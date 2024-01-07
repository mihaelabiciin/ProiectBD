import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Activitate } from 'src/app/models/activitate';
import { Locatie } from 'src/app/models/locatie';
import { ActivitateService } from 'src/app/services/activitate.service';
import { LocatieService } from 'src/app/services/locatie.service';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';

@Component({
  selector: 'app-activitati',
  templateUrl: './activitati.component.html',
  styleUrls: ['./activitati.component.css']
})
export class ActivitatiComponent {
  constructor(private locatieService: LocatieService, private snackBar: MatSnackBar, private activitateService: ActivitateService, private dialog: MatDialog) {
    this.getLocatii();
  }

  locatii: Locatie[] = [];
  activitati: Activitate[] = [];
  displayedColumns: string[] = ['id', 'nume', 'numeLocatie' ,'actions'];
  dataSource = new MatTableDataSource<Locatie>();
  addActivitate() {}
  getLocatii() {
    this.locatieService.getLocatii().subscribe(
      (result) => {
        this.locatii = result as Locatie[];
        this.getActivitati();
      },
      (error) => {
        this.snackBar.open("Nu se pot incarca locatiile");
      }
    );
  }

  getActivitati() {
    this.activitateService.getActivitati().subscribe(
      (result) => {
        this.activitati = result as Activitate[];
        this.activitati.forEach(activitate => {
          activitate.locatie = this.locatii.filter((locatie) => locatie.idLocatie == activitate.idLocatie)[0]
        });
      },
      (error) => {
        this.snackBar.open("Nu se pot incarca activitatile");
      }
    )
  }

  editActivitate() {

  }

  deleteActivitate(activitate: Activitate) {
    const dialogRef = this.dialog.open(DeleteConfirmModalComponent, {
      data: {
        entity: activitate,
        type: 'activitatea',
      }
    });

    dialogRef.afterClosed().subscribe((deleteLocatie: boolean) => {
      if (deleteLocatie == true) {
        this.activitateService.deleteActivitati(activitate.idActivitate).subscribe(() =>
          this.getActivitati())
      }
    });
  }
}
