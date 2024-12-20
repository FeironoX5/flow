import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../icon.component';
import { SectionComponent } from '../section/section.component';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [SectionComponent, IconComponent, RouterLink, RouterLinkActive],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
