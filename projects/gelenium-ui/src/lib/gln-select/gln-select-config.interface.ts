import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnSelectConfig extends GlnFrameConfig {
  // exterior?: GlnFrameExterior | undefined;
  // frameSize?: GlnFrameSize | undefined;
  // frameSizeValue?: number | undefined;
  // isLabelShrink?: boolean | undefined;
  // isNoAnimation?: boolean | undefined;
  // isNoLabel?: boolean | undefined;
  // labelPd?: number | undefined; // px
  // ornamLfAlign?: GlnFrameOrnamAlign | undefined;
  // ornamRgAlign?: GlnFrameOrnamAlign | undefined;
  backdropClass?: string | undefined; // default 'cdk-overlay-transparent-backdrop'
  isCheckmark?: boolean | undefined;
  isMultiple?: boolean | undefined;
  isNoIcon?: boolean | undefined;
  isNoRipple?: boolean | undefined;
  noElevation?: boolean | undefined;
  overlayPanelClass?: string | string[] | undefined;
  panelClass?: string | string[] | Set<string> | { [key: string]: any } | undefined;
  position?: string | undefined; // Horizontal position = 'start' | 'center' | 'end';
  visibleSize?: number | undefined; // default 0
}
