import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-flow-page',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class FlowPageComponent implements OnInit {
  countdownSeconds: number = 1500;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  startCountdown() {
    setInterval(() => {
      this.countdownSeconds =
        this.countdownSeconds == 0 ? 1500 : this.countdownSeconds - 1;
        this.cdr.detectChanges();
    }, 1000);
  }

  addLeadingZero(x: number): string {
    return x < 10 ? '0' + x : x.toString();
  }

  get formatTimeLeft(): string {
    const minutesLeft = this.addLeadingZero(
      Math.floor(this.countdownSeconds / 60)
    );
    const secondsLeft = this.addLeadingZero(this.countdownSeconds % 60);
    return `${minutesLeft}:${secondsLeft}`;
  }
}

@Component({
  selector: 'app-flow-page-header',
  template: `
    <div class="stats">
      <span class="date">4 апреля</span>
    </div>
  `,
  styleUrls: ['./flow.component.scss'],
})
export class FlowPageHeaderComponent {}

@Component({
  selector: 'app-flow-page-side',
  template: ` flow-page-side `,
  styleUrls: ['./flow.component.scss'],
})
export class FlowPageSideComponent {}
