import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanUtil } from '../_utils/boolean.util';

/**
 * The parent element must have css styles:
 * - position: relative;
 * - overflow: hidden;
 */
const CSS_RIPPLE_CLASS = 'glntr-ripple';
let uniqueIdCounter = 0;

@Component({
  selector: 'gln-touch-ripple',
  exportAs: 'glnTouchRipple',
  template: '',
  styleUrls: ['./gln-touch-ripple.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnTouchRippleComponent implements OnChanges {
  @Input()
  public id = `glntr-${uniqueIdCounter++}`;
  @Input()
  public isCenter: string | null = null;

  private isCenterVal = false;

  constructor(private hostRef: ElementRef<HTMLElement>, @Inject(DOCUMENT) private document: Document) {}

  @HostListener('mousedown', ['$event'])
  public doMousedown(event: MouseEvent): void {
    this.doRipple(event, this.isCenterVal);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['isCenter']) {
      this.isCenterVal = !!BooleanUtil.init(this.isCenter);
    }
  }

  // ** Public methods **

  public trigger(event: MouseEvent, isCenter: boolean = this.isCenterVal): void {
    this.doRipple(event, isCenter);
  }

  // ** Private methods **

  private doRipple(event: MouseEvent, isCenter: boolean): void {
    const parentElement = this.hostRef.nativeElement.parentElement;
    if (!parentElement) {
      return;
    }
    const clientHeight = parentElement.clientHeight;
    const clientWidth = parentElement.clientWidth;

    if (clientHeight && clientWidth) {
      const radius: number = Math.min(clientWidth, clientHeight) / 2;
      let offsetX: number = Math.round(clientWidth / 2);
      let offsetY: number = Math.round(clientHeight / 2);
      if (!isCenter && event.currentTarget) {
        const rect: DOMRect = (event.currentTarget as HTMLElement).getBoundingClientRect() || { left: 0, top: 0 };
        offsetX = Math.round(event.clientX - rect.left);
        offsetY = Math.round(event.clientY - rect.top);
      }
      const left: number = offsetX - radius / 2;
      const top: number = offsetY - radius / 2;

      const circle: HTMLSpanElement = this.document.createElement('span');
      circle.style.width = circle.style.height = `${radius}px`;
      circle.style.left = `${left}px`;
      circle.style.top = `${top}px`;
      circle.classList.add(CSS_RIPPLE_CLASS);

      circle.addEventListener(
        'animationend',
        () => {
          if (this.hostRef.nativeElement.children.length > 0) {
            this.hostRef.nativeElement.children.item(0)?.remove();
          }
        },
        // A value of "true" indicates that the listener should be called at most once after being added.
        { once: true }
      );
      circle.addEventListener(
        'animationcancel',
        () => {
          if (this.hostRef.nativeElement.children.length > 0) {
            this.hostRef.nativeElement.children.item(0)?.remove();
          }
        },
        // A value of "true" indicates that the listener should be called at most once after being added.
        { once: true }
      );

      this.hostRef.nativeElement.appendChild(circle);
    }
  }
}
