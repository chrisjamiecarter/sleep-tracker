import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SleepRecord } from './sleep-record.interface';

@Injectable({
  providedIn: 'root'
})
export class SleepRecordService {
  private url = 'https://localhost:7135/api/v1/sleeps';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  private _sleepRecords = new BehaviorSubject<SleepRecord[]>([]);

  public SleepRecords = this._sleepRecords.asObservable();

  constructor(private http: HttpClient) {}

  getSleepRecords(): void {
    this.http.get<SleepRecord[]>(this.url).subscribe(
      (records) => {
        this._sleepRecords.next(records);
      },
      (error) => {
        console.error('ERROR - Fetching Sleep Records: ', error);
      }
    );
  }
}
