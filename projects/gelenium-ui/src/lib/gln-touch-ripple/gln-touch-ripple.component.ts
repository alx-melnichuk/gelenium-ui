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
import { BooleanUtil } from '../_utils/boolean.util';
import { HtmlElemUtil } from '../_utils/html-elem.util';

const RIPPLE_CLASS = 'glntr-ripple';
let uniqueIdCounter = 0;

@Component({
  selector: 'gln-touch-ripple',
  exportAs: 'glnTouchRipple',
  template: '',
  styleUrls: ['./gln-touch-ripple.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnTouchRippleComponent implements OnChanges, OnInit {
  @Input()
  public id = `glntr-${uniqueIdCounter++}`;
  @Input()
  public isCenter: string | null = null;

  private center = false;
  private checkParentSuccessful = false;

  constructor(private hostRef: ElementRef<HTMLElement>, @Inject(DOCUMENT) private document: Document) {}

  @HostListener('mousedown', ['$event'])
  public doMousedown(event: MouseEvent): void {
    this.doRipple(event, this.center);
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.isCenter) {
      this.center = !!BooleanUtil.init(this.isCenter);
    }
  }

  public ngOnInit(): void {
    const parentElement = this.hostRef.nativeElement.parentElement;
    if (parentElement != null) {
      const checkRelative = getComputedStyle(parentElement).getPropertyValue('position') === 'relative';
      const checkOverflow = getComputedStyle(parentElement).getPropertyValue('overflow') === 'hidden';
      if (!checkRelative) {
        throw new Error(`The parent element must have "position: relative".`);
      }
      if (!checkOverflow) {
        throw new Error(`The parent element must have "overflow: hidden".`);
      }
      this.checkParentSuccessful = checkRelative && checkOverflow;
    }
  }

  // ** Public API **

  public touchRipple(event: MouseEvent, isCenter: boolean = this.center): void {
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

      circle.addEventListener(
        'animationend',
        () => {
          // console.log(`doRipple() animationend`); // TODO del;
          if (this.hostRef.nativeElement.children.length > 0) {
            this.hostRef.nativeElement.children.item(0)?.remove();
          }
        },
        // A value of "true" indicates that the listener should be called at most once after being added.
        { once: true }
      );
      this.hostRef.nativeElement.appendChild(circle);

      circle.addEventListener(
        'animationcancel',
        () => {
          // console.log(`doRipple() animationcancel`); // TODO del;
          if (this.hostRef.nativeElement.children.length > 0) {
            this.hostRef.nativeElement.children.item(0)?.remove();
          }
        },
        // A value of "true" indicates that the listener should be called at most once after being added.
        { once: true }
      );
      this.hostRef.nativeElement.appendChild(circle);

      // const startTimer = set Timeout(() => {
      //   clear Timeout(startTimer);
      //   if (this.hostRef.nativeElement.children.length > 0) {
      //     this.hostRef.nativeElement.children.item(0)?.remove();
      //   }
      // }, 1000);
    }
  }
}
