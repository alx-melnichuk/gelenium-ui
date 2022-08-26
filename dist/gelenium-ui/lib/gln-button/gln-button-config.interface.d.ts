import { GlnButtonExterior } from './gln-button-exterior.interface';
import { GlnFrameSize } from '../gln-frame/gln-frame-size.interface';
import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
export interface GlnButtonConfig {
    exterior?: GlnButtonExterior | undefined;
    frameSize?: GlnFrameSize | undefined;
    frameSizeValue?: number | undefined;
    isNoRipple?: boolean | undefined;
    labelPd?: number | undefined;
    ornamLfAlign?: GlnFrameOrnamAlign | undefined;
    ornamRgAlign?: GlnFrameOrnamAlign | undefined;
}
