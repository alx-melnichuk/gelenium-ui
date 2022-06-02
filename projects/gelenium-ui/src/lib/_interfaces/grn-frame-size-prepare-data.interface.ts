export type GrnFrameSizePaddingHorRes = { left: number; right: number };

export type GrnFrameSizePaddingVerRes = { top: number; bottom: number };

export type GrnFrameSizePaddingVerHorRes = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  frameSizeValue: number;
  lineHeight: number;
  exterior: string;
};

export interface GrnFrameSizePrepareData {
  getExterior(): string | null;
  getBorderRadius(frameSizeValue: number, lineHeight: number): string | null;
  getPaddingHor(frameSizeValue: number, lineHeight: number): GrnFrameSizePaddingHorRes | null;
  getPaddingVer(frameSizeValue: number, lineHeight: number): GrnFrameSizePaddingVerRes | null;
}
