import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../icon.component';
import { SectionComponent } from '../section/section.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppStateService } from '../../../services/app-state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [
    SectionComponent,
    IconComponent,
    RouterLink,
    RouterLinkActive,
    NgClass,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  constructor(protected state: AppStateService) {}

  toggleNewTaskPopup() {
    this.state.isNewTaskPopupOpen.update((value) => !value);
  }
}
