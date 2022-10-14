import { NumberUtil } from '../_utils/number.util';

import { GlnFrameExterior } from './gln-frame-exterior.interface';

export interface GlnFrameCssHorParams {
  borderRadius: string | null;
  paddingLeft: string | null;
  paddingRight: string | null;
  paddingShrink: string | null;
}
export interface GlnFrameCssVerParams {
  paddingBottom: string | null;
  paddingTop: string | null;
  translateY: string | null;
  translateY2: string | null;
}
export interface GlnFrameCssParams extends GlnFrameCssHorParams, GlnFrameCssVerParams {}

export class GlnFrameUtil {
  public static getCssHorParams(exteriorVal: GlnFrameExterior, frameSizeValue: number): GlnFrameCssHorParams {
    let borderRadius: string | null = null;
    let paddingLeft: string | null = null;
    let paddingShrink: string | null = null;

    if (frameSizeValue > 0) {
      const radius: string = NumberUtil.roundTo100(frameSizeValue / 10)
        .toString()
        .concat('px');
      switch (exteriorVal) {
        case GlnFrameExterior.outlined:
          borderRadius = radius;
          const paddingLeftPrm1: number = NumberUtil.roundTo100(0.25 * frameSizeValue);
          paddingLeft = paddingLeftPrm1.toString().concat('px');
          paddingShrink = NumberUtil.roundTo100(2 * paddingLeftPrm1 * 1.33)
            .toString()
            .concat('px');
          break;
        case GlnFrameExterior.underline:
          borderRadius = radius + ' ' + radius + ' 0px 0px';
          const paddingLeftPrm2: number = NumberUtil.roundTo100(0.21428 * frameSizeValue);
          paddingLeft = paddingLeftPrm2.toString().concat('px');
          paddingShrink = NumberUtil.roundTo100(2 * paddingLeftPrm2 * 1.33)
            .toString()
            .concat('px');
          break;
        case GlnFrameExterior.standard:
          borderRadius = null;
          paddingLeft = '0px';
          paddingShrink = '0px';
          break;
      }
    }
    return { borderRadius, paddingLeft, paddingRight: paddingLeft, paddingShrink };
  }
  public static getCssVerParams(exteriorVal: GlnFrameExterior, frameSizeValue: number, lineHeight: number): GlnFrameCssVerParams {
    let paddingBottom: string | null = null;
    let paddingTop: string | null = null;
    let translateY: string | null = null;
    let translateY2: string | null = null;

    if (frameSizeValue > 0 && lineHeight > 0) {
      const param = frameSizeValue - lineHeight;
      switch (exteriorVal) {
        case GlnFrameExterior.outlined:
          const paddingBottomPrm1 = param * 0.5;
          paddingBottom = paddingBottomPrm1.toString().concat('px');
          paddingTop = paddingBottom;
          translateY = NumberUtil.roundTo100((-0.75 * lineHeight) / 2)
            .toString()
            .concat('px');
          translateY2 = NumberUtil.roundTo100(paddingBottomPrm1).toString().concat('px');
          break;
        case GlnFrameExterior.underline:
          paddingBottom = (param * 0.25).toString().concat('px');
          paddingTop = (param * 0.75).toString().concat('px');
          translateY = NumberUtil.roundTo100((frameSizeValue * 0.757 - lineHeight * 1.257) * 0.45)
            .toString()
            .concat('px');
          translateY2 = NumberUtil.roundTo100(param * 0.5)
            .toString()
            .concat('px');
          break;
        case GlnFrameExterior.standard:
          paddingBottom = (param * 0.25).toString().concat('px');
          paddingTop = (param * 0.75).toString().concat('px');
          translateY = NumberUtil.roundTo100((frameSizeValue * 0.75 - lineHeight * 1.27) * 0.4)
            .toString()
            .concat('px');
          translateY2 = NumberUtil.roundTo100(param * 0.75)
            .toString()
            .concat('px');
          break;
      }
    }
    return { paddingBottom, paddingTop, translateY, translateY2 };
  }
}
