import { Component } from '@angular/core';
import { MatDialogTitle, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-add-sleep-record-dialog',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './add-sleep-record-dialog.component.html',
  styleUrl: './add-sleep-record-dialog.component.scss',
})
export class AddSleepRecordDialogComponent {}
