import { Directive, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';

import { GlnDebounceTimer } from '../_classes/gln-debounce-timer';

const DEBOUNCE_TIMEOUT_RESIZE = 200;

@Directive({
  selector: '[glnAutocompletePanel]',
  exportAs: 'glnAutocompletePanel',
})
export class GlnAutocompletePanelDirective implements OnInit, OnDestroy {
  @Output('glnAutocompletePanelAttached')
  readonly attached: EventEmitter<void> = new EventEmitter();
  @Output('glnAutocompletePanelDetached')
  readonly detached: EventEmitter<void> = new EventEmitter();
  @Output('glnAutocompletePanelResize')
  readonly resize: EventEmitter<void> = new EventEmitter();

  protected debounceTimer: GlnDebounceTimer = new GlnDebounceTimer();

  public ngOnInit(): void {
    this.attached.emit();
  }

  public ngOnDestroy(): void {
    this.debounceTimer.clear();
    this.detached.emit();
  }

  @HostListener('window:resize')
  public handlerResize(): void {
    this.debounceTimer.run(() => {
      this.resize.emit();
    }, DEBOUNCE_TIMEOUT_RESIZE);
  }
}
