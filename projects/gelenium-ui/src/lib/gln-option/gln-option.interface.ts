import { ElementRef } from '@angular/core';

export interface GlnOption {
  hostRef: ElementRef<HTMLElement>;
  getTextContent(): string;
  getTrustHtml(): string;
  getValue<T>(): T | null | undefined;
  /** Check or uncheck disabled. */
  setDisabled(value: boolean | null | undefined): void;
  /** Check or uncheck marking. */
  setMarked(value: boolean | null): void;
  /** Check or uncheck selected. */
  setSelected(value: boolean | null): void;
}
