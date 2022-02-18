import { InjectionToken } from '@angular/core';

export const GRN_SIZE_PREPARE_DATA = new InjectionToken<GrnSizePrepareData>('GRN_SIZE_PREPARE_DATA');

export type GrnSizePaddingHorRes = { left: number; right: number };

export type GrnSizePaddingVerRes = { top: number; bottom: number };

export type GrnSizePaddingVerHorRes = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  frameSizeValue: number;
  lineHeight: number;
  exterior: string;
};

export interface GrnSizePrepareData {
  getExterior(): string | null;
  getBorderRadius(frameSizeValue: number, lineHeight: number): string | null;
  getPaddingHor(frameSizeValue: number, lineHeight: number): GrnSizePaddingHorRes | null;
  getPaddingVer(frameSizeValue: number, lineHeight: number): GrnSizePaddingVerRes | null;
}
