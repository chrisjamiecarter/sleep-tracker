import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CreateSleepRecordDialogComponent } from '../sleep-records/create-sleep-record-dialog/create-sleep-record-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  matDialog = inject(MatDialog);

  onAddSleepRecordButton() {
    this.matDialog.open(CreateSleepRecordDialogComponent, {
      width: "20rem"
    });
  }
}
