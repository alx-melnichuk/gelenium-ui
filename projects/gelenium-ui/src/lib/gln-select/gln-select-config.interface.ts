import { GlnFrameConfig } from '../gln-frame/gln-frame-config.interface';

export interface GlnSelectConfig extends GlnFrameConfig {
  //   interface GlnFrameConfig
  // exterior?: string | undefined; // GlnFrameExteriorType // +
  // frameSize?: string | undefined; // GlnFrameSizeType    // +
  // isLabelShrink?: boolean | undefined;                   // +
  // isNoAnimation?: boolean | undefined;                   // +
  // isRequired?: boolean | undefined;                      // +

  // #exterior?: GlnFrameExterior | undefined;
  // #frameSize?: GlnFrameSize | undefined;
  // #frameSizeValue?: number | undefined;
  // #isLabelShrink?: boolean | undefined;
  // #isNoAnimation?: boolean | undefined;
  // #isNoLabel?: boolean | undefined;
  // #labelPd?: number | undefined; // px

  backdropClass?: string | undefined; // default 'cdk-overlay-transparent-backdrop' // + only  in onfig
  isCheckmark?: boolean | undefined; // +
  isError?: boolean | undefined; // +
  isMultiple?: boolean | undefined; // +
  isNoIcon?: boolean | undefined; // +
  isNoRipple?: boolean | undefined; // +
  isPlaceholder?: boolean | undefined; // +
  isReadOnly?: boolean | undefined; // +
  ornamLfAlign?: string | undefined; // GlnFrameOrnamAlignType // +
  ornamRgAlign?: string | undefined; // GlnFrameOrnamAlignType // +
  overlayPanelClass?: string | string[] | undefined; // + only in config
  panelClass?: string | string[] | Set<string> | { [key: string]: any } | undefined; // +
  position?: string | undefined; // Horizontal position = 'start' | 'center' | 'end';// +
  visibleSize?: number | undefined; // default 0
}

/*export interface GlnInputConfig extends GlnFrameConfig {
//  public id = `glnsl-${uniqueIdCounter++}`;
//  public config: GlnSelectConfig | null | undefined;
//  public exterior: string | null | undefined; // GlnFrameExteriorType
//  public frameSize: string | null | undefined; // GlnFrameSizeType
//  public helperText: string | null | undefined;
+!  public isCheckmark: string | boolean | null | undefined;
++  public isDisabled: string | boolean | null | undefined;
+!  public isError: string | boolean | null | undefined;
//  public isLabelShrink: string | boolean | null | undefined;
+!  public isMultiple: string | boolean | null | undefined;
    public isNoAnimation: string | boolean | null | undefined;
+!  public isNoIcon: string | boolean | null | undefined;
+!  public isNoRipple: string | boolean | null | undefined;
+!  public isPlaceholder: string | boolean | null | undefined;
+!  public isReadOnly: string | boolean | null | undefined;
+!  public isRequired: string | boolean | null | undefined;
  public label: string | null | undefined;
  public maxLength: number | null | undefined;
  public minLength: number | null | undefined;
+!  public ornamLfAlign: string | null | undefined; // OrnamAlignType
+!  public ornamRgAlign: string | null | undefined; // OrnamAlignType
+!  public panelClass: string | string[] | Set<string> | { [key: string]: unknown } = '';
+!  public position: string | null | undefined; // Horizontal position = 'start' | 'center' | 'end';
+!  public visibleSize: number = 0;
  public tabIndex: number = 0;
  public wdFull: string | null | undefined;
}*/
