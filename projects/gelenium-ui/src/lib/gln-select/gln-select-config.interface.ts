import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnSelectConfig extends GlnFrameConfig {
  // exterior?: GlnFrameExterior | undefined;
  // frameSize?: GlnFrameSize | undefined;
  // frameSizeValue?: number | undefined;
  // hoverColor?: boolean | undefined;
  // isLabelShrink?: boolean | undefined;
  // labelPd?: number | undefined; // px
  // isNoAnimation?: boolean | undefined;
  // noLabel?: boolean | undefined;
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
