import { ElementRef } from '@angular/core';

export interface GlnOption {
  /** Check or uncheck disabled. */
  disabled: boolean | null | undefined;
  /** Check or uncheck marking. */
  marked: boolean | null | undefined;
  /** Check or uncheck selected. */
  selected: boolean | null | undefined;

  readonly hostRef: ElementRef<HTMLElement>;
  readonly id: string;
  readonly value: unknown | null | undefined;

  getTextContent(): string;
  getTrustHtml(): string;
}
