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
  selector: 'grn-infinite-scroll',
  exportAs: 'grnInfiniteScroll',
  templateUrl: './grn-infinite-scroll.component.html',
  styleUrls: ['./grn-infinite-scroll.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrnInfiniteScrollComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input()
  public options: IntersectionObserverInit = {};

  @Output()
  readonly scrolled: EventEmitter<void> = new EventEmitter();

  @ViewChild('anchor')
  public anchor: ElementRef<HTMLElement> | null = null;

  private observer: IntersectionObserver | null = null;

  constructor(private host: ElementRef) {}

  ngOnInit(): void {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options,
    };

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.scrolled.emit();
      }
    }, options);
  }

  ngAfterViewInit(): void {
    if (this.observer !== null && this.anchor !== null) {
      this.observer.observe(this.anchor.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer !== null) {
      this.observer.disconnect();
    }
  }

  private isHostScrollable(): boolean {
    const style = window.getComputedStyle(this.host.nativeElement);
    return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
  }
}
