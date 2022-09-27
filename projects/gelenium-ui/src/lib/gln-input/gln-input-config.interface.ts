import { GlnFrameOrnamAlign } from '../directives/gln-frame-ornament/gln-frame-ornam-align.interface';
import { GlnFrameConfig2 } from '../gln-frame/gln-frame-config.interface';

export interface GlnInputConfig extends GlnFrameConfig2 {
  // exterior?: GlnFrameExterior | undefined;
  // frameSize?: GlnFrameSize | undefined;
  // frameSizeValue?: number | undefined;
  // isLabelShrink?: boolean | undefined; //+
  // isNoAnimation?: boolean | undefined; //+
  // isNoLabel?: boolean | undefined; //+
  // labelPd?: number | undefined; // px
  isError?: boolean | undefined; //+
  isReadOnly?: boolean | undefined; //+
  isRequired?: boolean | undefined; //+
  ornamLfAlign?: GlnFrameOrnamAlign | undefined;
  ornamRgAlign?: GlnFrameOrnamAlign | undefined;
}
