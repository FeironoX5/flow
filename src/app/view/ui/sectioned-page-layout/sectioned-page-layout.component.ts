import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { NgStyle } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sectioned-page-layout',
  templateUrl: './sectioned-page-layout.component.html',
  styleUrls: ['./sectioned-page-layout.component.scss'],
  imports: [SectionComponent, NgStyle, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionedPageLayoutComponent {
  @ViewChild('sideOutlet', { static: true }) sideOutlet!: RouterOutlet;
  private isActivated = false;

  constructor(private cdr: ChangeDetectorRef, private host: ElementRef) {}

  ngAfterViewInit(): void {
    this.updateStyles();
    this.sideOutlet.activateEvents.subscribe(() => this.updateStyles());
    this.sideOutlet.deactivateEvents.subscribe(() => this.updateStyles());
  }

  private updateStyles(): void {
    this.isActivated = this.sideOutlet.isActivated;
    this.host.nativeElement.style.gridTemplateColumns =
      this.computedStyles.gridTemplateColumns;
    this.cdr.detectChanges();
  }

  get computedStyles() {
    return {
      gridTemplateColumns: this.isActivated ? 'auto 1fr' : 'auto',
      displaySideSection: this.isActivated ? 'block' : 'none',
      aspectRatioContent: this.isActivated ? '1 / 1' : 'auto',
    };
  }
}
