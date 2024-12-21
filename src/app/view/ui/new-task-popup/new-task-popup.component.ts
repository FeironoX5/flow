import { Component } from '@angular/core';
import { SectionComponent } from "../section/section.component";
import { IconComponent } from "../icon.component";

@Component({
  selector: 'app-new-task-popup',
  imports: [SectionComponent, IconComponent],
  templateUrl: './new-task-popup.component.html',
  styleUrl: './new-task-popup.component.scss',
})
export class NewTaskPopupComponent {}
