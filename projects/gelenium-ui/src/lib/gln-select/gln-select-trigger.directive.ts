import { Directive, InjectionToken } from '@angular/core';

export const GLN_SELECT_TRIGGER = new InjectionToken<GlnSelectTriggerDirective>('GlnSelectTrigger');

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'gln-select-trigger',
  providers: [{ provide: GLN_SELECT_TRIGGER, useExisting: GlnSelectTriggerDirective }],
})
export class GlnSelectTriggerDirective {}
