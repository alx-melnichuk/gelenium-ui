export declare type GlnFrameSizePaddingHorRes = {
    left: number;
    right: number;
};
export declare type GlnFrameSizePaddingVerRes = {
    top: number;
    bottom: number;
};
export declare type GlnFrameSizePaddingVerHorRes = {
    left: number;
    right: number;
    top: number;
    bottom: number;
    frameSizeValue: number;
    lineHeight: number;
    exterior: string;
};
export interface GlnFrameSizePrepare {
    getExterior(): string | null;
    getBorderRadius(frameSizeValue: number, lineHeight: number): string | null;
    getPaddingHor(frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingHorRes | null;
    getPaddingVer(frameSizeValue: number, lineHeight: number): GlnFrameSizePaddingVerRes | null;
}
