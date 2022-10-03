import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GlnFrameConfig2 } from '../gln-frame/gln-frame-config.interface';

export interface GlnInputConfig extends GlnFrameConfig2 {
  // exterior?: GlnFrameExterior | undefined;
  // frameSizeValue?: number | undefined;
  // isLabelShrink?: boolean | undefined; //++html
  // isNoAnimation?: boolean | undefined; //++html
  // isNoLabel?: boolean | undefined;     //++html
  // labelPd?: number | undefined; // px
  isError?: boolean | undefined; //++html
  isReadOnly?: boolean | undefined; //++html
  isRequired?: boolean | undefined; //++html
  ornamLfAlign?: GlnFrameOrnamAlign | undefined;
  ornamRgAlign?: GlnFrameOrnamAlign | undefined;
}
