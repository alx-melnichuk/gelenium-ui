import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnSelectConfig extends GlnFrameConfig {
  //   interface GlnFrameConfig
  // exterior?: string | undefined; // GlnFrameExteriorType
  // isLabelShrink?: boolean | undefined;
  // isNoAnimation?: boolean | undefined;
  // isRequired?: boolean | undefined;
  // size?: number | string | undefined; // 'short','small','middle','wide','large','huge'

  backdropClass?: string | undefined; // default 'cdk-overlay-transparent-backdrop'
  isCheckmark?: boolean | undefined;
  isError?: boolean | undefined;
  isMaxWd?: boolean | undefined;
  isMultiple?: boolean | undefined;
  isNoIcon?: boolean | undefined;
  isNoRipple?: boolean | undefined;
  isPlaceholder?: boolean | undefined;
  isReadOnly?: boolean | undefined;
  ornamLfAlign?: string | undefined; // GlnFrameOrnamAlignType
  ornamRgAlign?: string | undefined; // GlnFrameOrnamAlignType
  overlayPanelClass?: string | string[] | undefined;
  panelClass?: string | string[] | Set<string> | { [key: string]: unknown } | undefined;
  position?: string | undefined; // Horizontal position = 'start'-default | 'center' | 'end';
  visibleSize?: number | undefined; // default 0
}
