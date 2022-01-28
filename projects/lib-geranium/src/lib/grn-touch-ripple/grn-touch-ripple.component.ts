import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, HostListener, OnInit } from '@angular/core';

const RIPPLE_CLASS = 'gtr-ripple';

@Component({
  selector: 'grn-touch-ripple',
  template: '',
  styleUrls: ['./grn-touch-ripple.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnTouchRippleComponent implements OnInit {
  private checkParentSuccessful = false;

  constructor(private hostRef: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  public doClick(event: PointerEvent): void {
    const clientHeight = this.hostRef.nativeElement.parentElement?.clientHeight;
    const clientWidth = this.hostRef.nativeElement.parentElement?.clientWidth;
    if (this.checkParentSuccessful && clientHeight && clientWidth) {
      const radius = Math.min(clientWidth, clientHeight) / 2;
      const circle = document.createElement('span');
      circle.style.width = circle.style.height = `${radius}px`;
      circle.style.left = `${event.offsetX - radius / 2}px`;
      circle.style.top = `${event.offsetY - radius / 2}px`;
      circle.classList.add(RIPPLE_CLASS);

      const list = this.hostRef.nativeElement.children;
      for (let idx = 0; idx < list.length; idx++) {
        list.item(idx)?.remove();
      }
      this.hostRef.nativeElement.appendChild(circle);
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
}
