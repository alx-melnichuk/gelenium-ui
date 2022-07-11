import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';

@Component({
  selector: 'gln-select2',
  templateUrl: './gln-select2.component.html',
  styleUrls: ['./gln-select2.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSelect2Component implements OnInit, AfterViewInit {
  @Input()
  public value!: any;

  @ViewChild('menuRef', { static: true })
  public menuRef!: ElementRef<HTMLElement>;
  @ViewChild('rootRef', { static: true })
  public rootRef!: ElementRef<HTMLElement>;

  @Output()
  readonly valueChangeEvents: EventEmitter<unknown> = new EventEmitter();

  public isShowingMenu = false;

  // I initialize the html-select component.
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    console.log(`GlnSelect2()`);
  }

  // ** Public methods **

  // I handle the mousedown event on the document.
  @HostListener('document:mousedown', ['$event'])
  public handleMousedown(event: MouseEvent): void {
    // If the user has moused-down OUTSIDE of the select-menu, we're going to
    // interpret that as moving focus away from the menu. As such, we're going to
    // close it.
    const node = event.target as Node;
    if (this.isShowingMenu && !this.rootRef.nativeElement.contains(node) && !this.menuRef.nativeElement.contains(node)) {
      this.hideMenu();
    }
  }

  // I hide the pop-up menu.
  @HostListener('window:resize', [])
  @HostListener('window:keydown.Esc', [])
  public hideMenu(): void {
    this.isShowingMenu = false;
  }

  public ngOnInit(): void {
    console.log(`OnInit()`);
  }

  // I get called once after the view template has been compiled.
  public ngAfterViewInit(): void {
    // CAUTION: Now that the view has been initialized, it means that Angular has
    // hooked up all of the directive and interpolation bindings. As such, it is safe
    // to move a portion of the view into the DOCUMENT ROOT without breaking those
    // bindings. How cool is that sauce!!
    document.body.appendChild(this.menuRef.nativeElement);
  }

  // I propagate the given value as a desired valueChange event.
  public selectValue(value: unknown): void {
    // NOTE: Since the selection method is part of the public API that is being
    // consumed from a different component, we have to explicitly tell the change-
    // detector to look for changes. Otherwise, the change-detector won't know that
    // the View-Model has changed (ex, the menu has been closed).
    this.changeDetectorRef.markForCheck();
    this.hideMenu();

    if (this.value !== value) {
      this.valueChangeEvents.emit(value);
    }
  }

  // I show the pop-up menu, and try to position it so it doesn't overlay with the
  // viewport of the browser.
  public showMenu(): void {
    const rootRect = this.rootRef.nativeElement.getBoundingClientRect();

    // By default, we're going to position the menu at the top-left corner of the
    // root button.
    this.isShowingMenu = true;
    // this.menuRef.nativeElement.style.left = `${rootRect.left}px`;
    HtmlElemUtil.setProperty(this.menuRef, 'left', NumberUtil.str(rootRect.left)?.concat('px') || null);
    // this.menuRef.nativeElement.style.top = `${rootRect.top}px`;
    HtmlElemUtil.setProperty(this.menuRef, 'top', NumberUtil.str(rootRect.top)?.concat('px') || null);
    // this.menuRef.nativeElement.style.width = null;
    HtmlElemUtil.setProperty(this.menuRef, 'width', null);
    // this.menuRef.nativeElement.style.minWidth = `${rootRect.width}px`;
    HtmlElemUtil.setProperty(this.menuRef, 'minWidth', NumberUtil.str(rootRect.width)?.concat('px') || null);
    // this.menuRef.nativeElement.style.height = null;
    HtmlElemUtil.setProperty(this.menuRef, 'height', null);

    // Since we don't know what's inside the menu (the content is projected), there's
    // no way for us to know about the dimensions ahead of time. As such, we're going
    // to stop and force the browser to reconcile the view-model with the template
    // (ie, we're going to force it to render the menu). This will give the menu
    // physical dimensions in the viewport that we can then measure.
    this.changeDetectorRef.detectChanges();

    // Measure the viewport and the menu position.
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const menuRect = this.menuRef.nativeElement.getBoundingClientRect();

    // When we position the menu, we don't want it to butt-up against the viewport,
    // as that would be provide sub-par look-and-feel. Let's make sure it never gets
    // closer than 10px from any edge.
    const minLeft = 10;
    const minTop = 10;
    const maxRight = windowWidth - 10;
    const maxBottom = windowHeight - 10;

    // Ok, let's start out with the natural position reported by the browser.
    const adjustedRect = {
      top: menuRect.top,
      left: menuRect.left,
      right: menuRect.right,
      bottom: menuRect.bottom,
    };

    // Now, let's adjust the rect so that the menu doesn't overlap with our min and
    // max offsets. First, we're going to do this by shifting the entire menu over.
    // Then, if the menu is still in a "bad" place, we're going to shrink the
    // dimensions in order to force the fit.

    // Constrain the left-edge. We're going to do this by shifting the entire menu.
    if (adjustedRect.left < minLeft) {
      adjustedRect.left += minLeft - adjustedRect.left;
      adjustedRect.right += minLeft - adjustedRect.left;

      // Constrain the right-edge. We're going to do this by shifting the entire menu.
    } else if (adjustedRect.right > maxRight) {
      adjustedRect.left -= adjustedRect.right - maxRight;
      adjustedRect.right -= adjustedRect.right - maxRight;
    }

    // Constrain the top-edge. We're going to do this by shifting the entire menu.
    if (adjustedRect.top < minTop) {
      adjustedRect.top += minTop - adjustedRect.top;
      adjustedRect.bottom += minTop - adjustedRect.top;

      // Constrain the bottom-edge. We're going to do this by shifting the entire menu.
    } else if (adjustedRect.bottom > maxBottom) {
      adjustedRect.top -= adjustedRect.bottom - maxBottom;
      adjustedRect.bottom -= adjustedRect.bottom - maxBottom;
    }

    // And, now that we've tried to shift the menu over in order to avoid edge-
    // overlap, we're going to ensure constraint by clamping the physical dimensions
    // of the menu.
    adjustedRect.left = Math.max(adjustedRect.left, minLeft);
    adjustedRect.top = Math.max(adjustedRect.top, minTop);
    adjustedRect.right = Math.min(adjustedRect.right, maxRight);
    adjustedRect.bottom = Math.min(adjustedRect.bottom, maxBottom);

    // Finally, we can update the position of the menu to reconcile it with the
    // calculated constraints of the viewport.
    this.menuRef.nativeElement.style.top = `${adjustedRect.top}px`;
    this.menuRef.nativeElement.style.left = `${adjustedRect.left}px`;
    this.menuRef.nativeElement.style.width = `${adjustedRect.right - adjustedRect.left}px`;
    this.menuRef.nativeElement.style.height = `${adjustedRect.bottom - adjustedRect.top}px`;
  }
}

@Component({
  selector: 'gln-select-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./gln-select-root.component.scss'],
  template: `<ng-content></ng-content>`,
})
export class GlnlSelectRootComponent {
  // ....
}

@Component({
  selector: 'gln-select-option',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./gln-select-option.component.scss'],
  template: `<ng-content></ng-content>`,
})
export class GlnSelectOptionComponent {
  @Input()
  public value!: unknown;

  // I initialize the html-select option component.
  constructor(private htmlSelect: GlnSelect2Component) {}

  // ---
  // PUBLIC METHODS.
  // ---

  // I handle the selection of the current option.
  @HostListener('click')
  public handleClick(): void {
    this.htmlSelect.selectValue(this.value);
  }
}
