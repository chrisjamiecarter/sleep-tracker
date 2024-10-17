import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SleepRecordService } from '../shared/sleep-record.service';
import { SleepRecord } from '../shared/sleep-record.interface';
import { DeleteSleepRecordDialogComponent } from './delete-sleep-record-dialog/delete-sleep-record-dialog.component';
import { UpdateSleepRecordDialogComponent } from './update-sleep-record-dialog/update-sleep-record-dialog.component';

@Component({
  selector: 'app-sleep-records',
  standalone: true,
  imports: [
    DatePipe,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './sleep-records.component.html',
  styleUrl: './sleep-records.component.scss',
})
export class SleepRecordsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['started', 'finished', 'duration', 'actions'];
  dataSource: MatTableDataSource<SleepRecord>;
  matDialog = inject(MatDialog);
  sleepRecords: SleepRecord[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sleepRecordService: SleepRecordService) {
    this.dataSource = new MatTableDataSource(this.sleepRecords);
  }

  ngOnInit(): void {
    this.sleepRecordService.SleepRecords.subscribe((records) => {
      this.sleepRecords = records;
      this.dataSource = new MatTableDataSource(records);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.sleepRecordService.getSleepRecords();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteSleepRecord(sleepRecord: SleepRecord) {
    console.log("DELETE", sleepRecord);
    this.matDialog.open(DeleteSleepRecordDialogComponent, {
      width: "20rem",
      data: sleepRecord,
    })
  }
  
  onUpdateSleepRecord(sleepRecord: SleepRecord) {
    console.log("UPDATE", sleepRecord);
    this.matDialog.open(UpdateSleepRecordDialogComponent, {
      width: "20rem",
      data: sleepRecord,
    })
  }
}
