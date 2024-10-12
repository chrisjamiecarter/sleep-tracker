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
import { AddSleepRecordDialogComponent } from '../sleep-records/add-sleep-record-dialog/add-sleep-record-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  addSleepRecordRialog = inject(MatDialog);

  openAddSleepRecordDialog() {
    this.addSleepRecordRialog.open(AddSleepRecordDialogComponent, {
      height: '30%',
      width: '30%',
    });
  }
}
