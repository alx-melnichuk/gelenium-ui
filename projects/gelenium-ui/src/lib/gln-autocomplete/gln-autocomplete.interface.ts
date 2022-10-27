import { ElementRef } from '@angular/core';

// Horizontal position
export type GlnAutocompletePositionType = 'start' | 'center' | 'end';

/** Horizontal position = 'start' | 'center' | 'end'; */
export enum GlnAutocompletePosition {
  start = 'start',
  center = 'center',
  end = 'end',
}

export class GlnAutocompletePositionUtil {
  public static create(value: GlnAutocompletePosition | string | null): GlnAutocompletePosition {
    return GlnAutocompletePositionUtil.convert((value || '').toString()) || GlnAutocompletePosition.start;
  }
  public static convert(value: string | null): GlnAutocompletePosition | null {
    let result: GlnAutocompletePosition | null = null;
    switch (value) {
      case GlnAutocompletePosition.start.valueOf():
        result = GlnAutocompletePosition.start;
        break;
      case GlnAutocompletePosition.center.valueOf():
        result = GlnAutocompletePosition.center;
        break;
      case GlnAutocompletePosition.end.valueOf():
        result = GlnAutocompletePosition.end;
        break;
    }
    return result;
  }
}

export interface Focusable {
  focus(): void;
}

export interface HostableRef {
  hostRef: ElementRef<HTMLElement>;
}

export interface Frameable {
  frameComp: HostableRef;
}
