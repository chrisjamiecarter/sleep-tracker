import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SleepRecordService } from '../../shared/sleep-record.service';
import { CreateSleepRecord } from '../../shared/create-sleep-record.interface';

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
  sleepRecordForm!: FormGroup;
  
  constructor(private sleepRecordService: SleepRecordService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sleepRecordForm = this.formBuilder.group({
      started: ['', Validators.required],
      finished: ['', Validators.required],
    })
  }

  onCreate() {
    console.log("sleepRecordForm.value", this.sleepRecordForm.value);
    console.log("sleepRecordForm.valid", this.sleepRecordForm.valid);
    if (this.sleepRecordForm.valid) {
      const request : CreateSleepRecord = {
        started: this.sleepRecordForm.value.started ?? '',
        finished: this.sleepRecordForm.value.finished ?? '',
      };
      this.sleepRecordService.createSleepRecord(request).subscribe((result) => {
        console.log("createSleepRecord.result", result);
      });
    }
  }
}
