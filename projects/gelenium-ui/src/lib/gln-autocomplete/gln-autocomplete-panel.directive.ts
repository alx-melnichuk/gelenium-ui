import { Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[glnAutocompletePanel]',
})
export class GlnAutocompletePanelDirective implements OnInit, OnDestroy {
  @Output()
  readonly attached: EventEmitter<ElementRef<HTMLElement>> = new EventEmitter();
  @Output()
  readonly detached: EventEmitter<ElementRef<HTMLElement>> = new EventEmitter();

  constructor(public hostRef: ElementRef<HTMLElement>) {}

  public ngOnInit(): void {
    console.log(`OnInit()`); // #
    this.attached.emit(this.hostRef);
  }

  public ngOnDestroy(): void {
    console.log(`OnDestroy()`); // #
    this.detached.emit(this.hostRef);
  }
}
