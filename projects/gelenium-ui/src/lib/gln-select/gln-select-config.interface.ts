import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnSelectConfig extends GlnFrameConfig {
  // exterior?: GlnFrameExterior | undefined;
  // frameSize?: GlnFrameSize | undefined;
  // frameSizeValue?: number | undefined;
  // isHoverColor?: boolean | undefined;
  // isLabelShrink?: boolean | undefined;
  // isNoAnimation?: boolean | undefined;
  // isNoLabel?: boolean | undefined;
  // labelPd?: number | undefined; // px
  // ornamLfAlign?: GlnFrameOrnamAlign | undefined;
  // ornamRgAlign?: GlnFrameOrnamAlign | undefined;

  isCheckmark?: boolean | undefined;
  isFixRight?: boolean | undefined;
  isMultiple?: boolean | undefined;
  isNoRipple?: boolean | undefined;
  noElevation?: boolean | undefined; // ?
  noIcon?: boolean | undefined;
  panelClass?: string | string[] | Set<string> | { [key: string]: any } | undefined;
  // visibleSize = -1; // TODO ??
}
