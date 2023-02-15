import { ElementRef } from '@angular/core';

export interface GlnOrnament {
  hostRef: ElementRef<HTMLElement>;
}

export const ORNAMENT_ALIGN: { [key: string]: string } = {
  'default': 'default',
  'center': 'center',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'baseline': 'baseline',
  'stretch': 'stretch',
};
