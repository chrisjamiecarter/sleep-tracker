import { Routes } from '@angular/router';
import { SleepRecordsComponent } from './sleep-records/sleep-records.component';

export const routes: Routes = [
    {
        path: '',
        component: SleepRecordsComponent,
        title: 'Sleep Tracker - Home',
      },
];
