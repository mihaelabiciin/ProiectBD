import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Locatie } from 'src/app/models/locatie';

@Component({
  selector: 'app-edit-locatie-modal',
  templateUrl: './edit-locatie-modal.component.html',
  styleUrls: ['./edit-locatie-modal.component.css']
})
export class EditLocatieModalComponent {
  constructor(public dialogRef: MatDialogRef<EditLocatieModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { locatie: Locatie, mode: string }) { 
      if (data.locatie == null)
        data.locatie = new Locatie('', '');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
