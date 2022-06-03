export type GlnFrameSizePaddingHorRes = { left: number; right: number };

export type GlnFrameSizePaddingVerRes = { top: number; bottom: number };

export type GlnFrameSizePaddingVerHorRes = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  frameSizeValue: number;
  lineHeight: number;
  exterior: string;
};

export interface GlnFrameSizePrepareData {
  getExterior(): string | null;
  getBorderRadius(frameSizeValue: number, lineHeight: number): string | null;
  getPaddingHor(frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingHorRes | null;
  getPaddingVer(frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingVerRes | null;
}
