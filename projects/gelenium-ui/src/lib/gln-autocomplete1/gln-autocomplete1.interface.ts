import { ElementRef } from '@angular/core';

// Horizontal position
export type GlnAutocomplete1PositionType = 'start' | 'center' | 'end';

/** Horizontal position = 'start' | 'center' | 'end'; */
export enum GlnAutocomplete1Position {
  start = 'start',
  center = 'center',
  end = 'end',
}

export class GlnAutocomplete1PositionUtil {
  public static create(value: GlnAutocomplete1Position | string | null): GlnAutocomplete1Position {
    return GlnAutocomplete1PositionUtil.convert((value || '').toString()) || GlnAutocomplete1Position.start;
  }
  public static convert(value: string | null): GlnAutocomplete1Position | null {
    let result: GlnAutocomplete1Position | null = null;
    switch (value) {
      case GlnAutocomplete1Position.start.valueOf():
        result = GlnAutocomplete1Position.start;
        break;
      case GlnAutocomplete1Position.center.valueOf():
        result = GlnAutocomplete1Position.center;
        break;
      case GlnAutocomplete1Position.end.valueOf():
        result = GlnAutocomplete1Position.end;
        break;
    }
    return result;
  }
}

export interface Focusable0 {
  focus(): void;
}

export interface HostableRef0 {
  hostRef: ElementRef<HTMLElement>;
}

export interface Frameable0 {
  frameComp: HostableRef0;
}
