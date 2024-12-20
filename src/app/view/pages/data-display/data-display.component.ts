import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TilesComponent } from "../../ui/tiles/tiles.component";

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TilesComponent],
})
export class DataDisplayComponent {}
@Component({
  selector: 'app-data-display-header',
  template: ` <div class="navigator">
    <div class="path">glebkiva</div>
    <div class="filters">Введите текст задачи</div>
  </div>`,
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayHeaderComponent {}
