import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SleepRecordService } from '../../shared/sleep-record.service';
import { CreateSleepRecord } from '../../shared/create-sleep-record.interface';
import { SuccessSnackBarComponent } from '../../snack-bars/success-snack-bar/success-snack-bar.component';
import { ErrorSnackBarComponent } from '../../snack-bars/error-snack-bar/error-snack-bar.component';

@Component({
  selector: 'app-add-sleep-record-dialog',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './add-sleep-record-dialog.component.html',
  styleUrl: './add-sleep-record-dialog.component.scss',
})
export class AddSleepRecordDialogComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  sleepRecordForm!: FormGroup;
  
  constructor(private sleepRecordService: SleepRecordService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sleepRecordForm = this.formBuilder.group({
      started: ['', Validators.required],
      finished: ['', Validators.required],
    })
  }

  onCreate() {
    if (this.sleepRecordForm.valid) {
      const request : CreateSleepRecord = {
        started: this.sleepRecordForm.value.started ?? '',
        finished: this.sleepRecordForm.value.finished ?? '',
      };
      this.sleepRecordService.createSleepRecord(request).subscribe((result) => {
        if (result) {
          this.openSuccessSnackBar('Sleep recorded successfully!');
        } else {
          this.openErrorSnackBar('Unable to record Sleep!');
        }
      });
    }
  }

  openErrorSnackBar(message: string) {
    this._snackBar.openFromComponent(ErrorSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }

  openSuccessSnackBar(message: string) {
    this._snackBar.openFromComponent(SuccessSnackBarComponent, {
      data: message,
      duration: 3000,
    });
  }
}
