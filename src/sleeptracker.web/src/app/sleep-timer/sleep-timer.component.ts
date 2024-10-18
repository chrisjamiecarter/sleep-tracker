import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sleep-timer',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatCardModule],
  templateUrl: './sleep-timer.component.html',
  styleUrl: './sleep-timer.component.scss',
})
export class SleepTimerComponent implements OnDestroy {
  counter: number = 0;
  timerString: string = this.getTimerString(this.counter);
  timerRef: any;
  running: boolean = false;

  getTimerString(milliseconds: number): string {
    const hours = Math.floor(milliseconds % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutes = Math.floor(milliseconds % (1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor(milliseconds % (1000 * 60) / 1000);
    
    let builder: string = '';
    builder += ("00" + hours).slice(-2)
    builder += ":";
    builder += ("00" + minutes).slice(-2)
    builder += ":";
    builder += ("00" + seconds).slice(-2)
    return builder;
  }

  onStartTimer() {
    this.running = true;
    const startTime = Date.now() - (this.counter || 0);
    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
      this.timerString = this.getTimerString(this.counter);
    }, 1000);
  }

  onPauseTimer() {
    this.running = false;
    clearInterval(this.timerRef);
  }

  onResetTimer() {
    this.running = false;
    this.counter = 0;
    this.timerString = this.getTimerString(this.counter);
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
