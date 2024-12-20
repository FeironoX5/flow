import { Component } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        font-family: 'Material Symbols Rounded';
        font-weight: normal;
        font-style: normal;
        font-size: 30px;
        line-height: 1;
      }
    `,
  ],
})
export class IconComponent {}
