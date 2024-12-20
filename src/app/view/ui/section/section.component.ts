import { ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-section',
  template: '<ng-content></ng-content>',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionComponent {
}
