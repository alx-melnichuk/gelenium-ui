import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';

const RIPPLE_CLASS = 'gtr-ripple';
let identifier = 0;

@Component({
  selector: 'grn-touch-ripple',
  exportAs: 'grnTouchRipple',
  template: '',
  styleUrls: ['./grn-touch-ripple.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnTouchRippleComponent implements OnChanges, OnInit {
  @Input()
  public id = 'grn_touch_ripple_' + ++identifier;
  @Input()
  public isCenter: string | null = null;
  @Input()
  public rippleColor: string | null = null; // '#1976d2', '#1976d280', 'rgba(255, 255, 255, 0.3)'  maxLength(32)

  private innIsCenter = false;
  private checkParentSuccessful = false;

  constructor(private hostRef: ElementRef<HTMLElement>, @Inject(DOCUMENT) private document: Document) {}

  @HostListener('mousedown', ['$event'])
  public doMousedown(event: MouseEvent): void {
    this.doRipple(event, this.innIsCenter);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isCenter) {
      this.innIsCenter = this.isCenter === '' || this.isCenter === 'true';
    }
    if (changes.rippleColor) {
      const color = this.rippleColor && this.rippleColor.length < 33 ? this.rippleColor : null;
      HtmlElemUtil.setProperty(this.hostRef, '--gtr-ripple-color', color);
    }
  }

  ngOnInit(): void {
    const parentElement = this.hostRef.nativeElement.parentElement;
    if (parentElement != null) {
      const checkRelative = getComputedStyle(parentElement).getPropertyValue('position') === 'relative';
      const checkOverflow = getComputedStyle(parentElement).getPropertyValue('overflow') === 'hidden';
      if (!checkRelative) {
        console.log('The parent element must have "position: relative".');
      }
      if (!checkOverflow) {
        console.log('The parent element must have "overflow: hidden".');
      }
      this.checkParentSuccessful = checkRelative && checkOverflow;
    }
  }

  // ** Public API **

  public touchRipple(event: MouseEvent, isCenter: boolean = this.innIsCenter): void {
    this.doRipple(event, isCenter);
  }

  // ** Private API **

  private doRipple(event: MouseEvent, isCenter: boolean): void {
    const parentElement = this.hostRef.nativeElement.parentElement;
    if (!this.checkParentSuccessful || !parentElement) {
      return;
    }
    const clientHeight = parentElement.clientHeight;
    const clientWidth = parentElement.clientWidth;
    if (this.checkParentSuccessful && clientHeight && clientWidth && event.currentTarget) {
      const radius = Math.min(clientWidth, clientHeight) / 2;
      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect() || { left: 0, top: 0 };
      let offsetX = Math.round(event.clientX - rect.left);
      let offsetY = Math.round(event.clientY - rect.top);
      if (isCenter) {
        offsetX = Math.round(clientWidth / 2);
        offsetY = Math.round(clientHeight / 2);
      }
      const left = offsetX - radius / 2;
      const top = offsetY - radius / 2;

      const circle = this.document.createElement('span');
      circle.style.width = circle.style.height = `${radius}px`;
      circle.style.left = `${left}px`;
      circle.style.top = `${top}px`;
      circle.classList.add(RIPPLE_CLASS);
      this.hostRef.nativeElement.appendChild(circle);

      const startTimer = setTimeout(() => {
        clearTimeout(startTimer);
        const children = this.hostRef.nativeElement.children;
        if (children.length > 0) {
          children.item(0)?.remove();
        }
      }, 1000);
    }
  }
}
