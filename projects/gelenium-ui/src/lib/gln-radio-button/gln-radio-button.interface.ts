import { ElementRef } from '@angular/core';

export interface GlnRadioButton {
  disabled: boolean | null | undefined;
  hideAnimation: boolean | null | undefined;
  noRipple: boolean | null | undefined;
  readOnly: boolean | null | undefined;
  selected: boolean | null | undefined;

  readonly hostRef: ElementRef<HTMLElement>;
  readonly id: string;
  readonly value: string | null | undefined;
}
