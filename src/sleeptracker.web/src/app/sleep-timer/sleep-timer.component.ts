import { Component, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-sleep-timer',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './sleep-timer.component.html',
  styleUrl: './sleep-timer.component.scss',
})
export class SleepTimerComponent implements OnDestroy {
  counter: number | undefined;
  timerRef: any;
  running: boolean = false;
  startText = 'Start';

  startTimer() {
    this.running = true;
    const startTime = Date.now() - (this.counter || 0);
    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
    }, 1000);
  }

  stopTimer() {
    this.running = false;
      clearInterval(this.timerRef);
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = undefined;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
