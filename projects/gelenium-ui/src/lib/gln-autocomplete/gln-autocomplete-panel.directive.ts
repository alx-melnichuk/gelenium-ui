import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HtmlElemUtil } from '../_utils/html-elem.util';
import { NumberUtil } from '../_utils/number.util';
import { GlnAutocompletePosition } from './gln-autocomplete.interface';

export interface GlnAutocompletePanelConfig {
  originRect: DOMRect;
  hostRect: DOMRect;
  maxWidth: number;
  isWdFull: boolean;
  position: string; // Horizontal position = 'start' | 'center' | 'end';
}

@Directive({
  selector: '[glnAutocompletePanel]',
})
export class GlnAutocompletePanelDirective implements OnInit, OnDestroy {
  @Input()
  public glnAutocompletePanel: GlnAutocompletePanelConfig | null | undefined;

  @Output()
  readonly attached: EventEmitter<ElementRef<HTMLElement>> = new EventEmitter();
  @Output()
  readonly detached: EventEmitter<ElementRef<HTMLElement>> = new EventEmitter();

  private borderRadius: number | null = null;
  private maxWidth: number | null = null;
  private minWidth: number | null = null;
  private left: number | null = null;
  private right: number | null = null;
  private top: number | null = null;

  constructor(public hostRef: ElementRef<HTMLElement>, private changeDetectorRef: ChangeDetectorRef) {
    console.log(`GlnAutocompletePanel()`); // #
  }

  public ngOnInit(): void {
    console.log(`OnInit()`); // #
    this.prepareProperties(this.glnAutocompletePanel);
    this.attached.emit(this.hostRef);
  }

  public ngOnDestroy(): void {
    console.log(`OnDestroy()`); // #
    this.detached.emit(this.hostRef);
  }

  // ** Private methods **

  private prepareProperties(config: GlnAutocompletePanelConfig | null | undefined): void {
    this.borderRadius = null;
    this.maxWidth = null;
    this.minWidth = null;
    this.left = null;
    this.right = null;
    this.top = null;

    if (config != null) {
      this.borderRadius = config.originRect.height > 0 ? NumberUtil.roundTo100(config.originRect.height / 10) : null;
      this.minWidth = config.originRect.width;
      this.top = config.originRect.bottom - config.hostRect.top;
      if (!config.isWdFull) {
        const clientRect = this.hostRef.nativeElement.getBoundingClientRect();
        switch (config.position) {
          case GlnAutocompletePosition.end:
            this.right = -config.originRect.width;
            break;
          case GlnAutocompletePosition.center:
            this.left = NumberUtil.roundTo100((config.originRect.width - clientRect.width) / 2);
            break;
          default:
            // GlnAutocompletePosition.start
            this.left = config.originRect.left - config.hostRect.left;
            break;
        }
      } else {
        this.maxWidth = config.maxWidth > config.originRect.width ? config.maxWidth : config.originRect.width;
        this.left = config.originRect.left - config.hostRect.left;
      }
    }
    HtmlElemUtil.setProperty(this.hostRef, '--glnacp-border-radius', NumberUtil.str(this.borderRadius)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, 'min-width', NumberUtil.str(this.minWidth)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, 'max-width', NumberUtil.str(this.maxWidth)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, 'left', NumberUtil.str(this.left)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, 'right', NumberUtil.str(this.right)?.concat('px'));
    HtmlElemUtil.setProperty(this.hostRef, 'top', NumberUtil.str(this.top)?.concat('px'));

    this.changeDetectorRef.markForCheck();
  }
}
