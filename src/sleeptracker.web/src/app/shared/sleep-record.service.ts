import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SleepRecord } from './sleep-record.interface';
import { CreateSleepRecord } from './create-sleep-record.interface';

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

  createSleepRecord(request: CreateSleepRecord): Observable<boolean> {
    return this.http
      .post<SleepRecord>(this.url, request, this.httpOptions)
      .pipe(
        map((record) => {
          this.getSleepRecords();
          return true;
        }),
        catchError((error) => {
          console.error('ERROR - Adding Sleep Record: ', error);
          return of(false);
        })
      );
  }
  
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
