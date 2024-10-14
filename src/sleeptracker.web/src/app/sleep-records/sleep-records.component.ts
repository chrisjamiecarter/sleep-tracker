import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SleepRecordService } from '../shared/sleep-record.service';
import { SleepRecord } from '../shared/sleep-record.interface';

@Component({
  selector: 'app-sleep-records',
  standalone: true,
  imports: [
    DatePipe,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './sleep-records.component.html',
  styleUrl: './sleep-records.component.scss',
})
export class SleepRecordsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'started', 'finished', 'duration'];
  dataSource: MatTableDataSource<SleepRecord>;
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
}
