import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'gln-infinite-scroll',
  exportAs: 'glnInfiniteScroll',
  templateUrl: './gln-infinite-scroll.component.html',
  styleUrls: ['./gln-infinite-scroll.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnInfiniteScrollComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input()
  public options: IntersectionObserverInit = {};

  @Output()
  readonly scrolled: EventEmitter<void> = new EventEmitter();

  @ViewChild('anchor')
  public anchor: ElementRef<HTMLElement> | null = null;

  private observer: IntersectionObserver | null = null;

  constructor(private hostRef: ElementRef) {}

  public ngOnInit(): void {
    const options = {
      root: this.isHostScrollable() ? this.hostRef.nativeElement : null,
      ...this.options,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.scrolled.emit();
      }
    }, options);
  }

  public ngAfterViewInit(): void {
    if (this.observer !== null && this.anchor !== null) {
      this.observer.observe(this.anchor.nativeElement);
    }
  }

  public ngOnDestroy(): void {
    if (this.observer !== null) {
      this.observer.disconnect();
    }
  }

  // ** Private methods **

  private isHostScrollable(): boolean {
    const style = window.getComputedStyle(this.hostRef.nativeElement);
    return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
  }
}
