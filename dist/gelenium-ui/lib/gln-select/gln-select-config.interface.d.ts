import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';
export interface GlnSelectConfig extends GlnFrameConfig {
    backdropClass?: string | undefined;
    isCheckmark?: boolean | undefined;
    isMultiple?: boolean | undefined;
    isNoIcon?: boolean | undefined;
    isNoRipple?: boolean | undefined;
    overlayPanelClass?: string | string[] | undefined;
    panelClass?: string | string[] | Set<string> | {
        [key: string]: any;
    } | undefined;
    position?: string | undefined;
    visibleSize?: number | undefined;
}
