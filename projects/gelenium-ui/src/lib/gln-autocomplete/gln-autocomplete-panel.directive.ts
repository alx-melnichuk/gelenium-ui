import { Directive, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[glnAutocompletePanel]',
  exportAs: 'glnAutocompletePanel',
})
export class GlnAutocompletePanelDirective implements OnInit, OnDestroy {
  @Output('glnAutocompletePanelAttached')
  readonly attached: EventEmitter<void> = new EventEmitter();
  @Output('glnAutocompletePanelDetached')
  readonly detached: EventEmitter<void> = new EventEmitter();

  public ngOnInit(): void {
    this.attached.emit();
  }

  public ngOnDestroy(): void {
    this.detached.emit();
  }
}
