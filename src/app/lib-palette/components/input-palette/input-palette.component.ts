import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { GlnFrameConfig, GlnFrameExterior, GlnFrameSize } from 'gelenium-ui';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from '../../../lib-core/constants';
import { UrlPalette } from '../../../lib-palette/lib-palette.constants';

@Component({
  selector: 'app-input-palette',
  templateUrl: './input-palette.component.html',
  styleUrls: ['./input-palette.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPaletteComponent {
  @Input()
  public labelShowSource = LABEL_SHOW_SOURCE;
  @Input()
  public labelOutlined = LABEL_OUTLINED;
  @Input()
  public labelUnderline = LABEL_UNDERLINE;
  @Input()
  public labelStandard = LABEL_STANDARD;
  @Input()
  public labelHtml = LABEL_HTML;
  @Input()
  public labelTs = LABEL_TS;
  @Input()
  public labelCss = LABEL_CSS;

  public urlPlInput = '/' + UrlPalette.get('URL_PALETTE') + '/' + UrlPalette.get('URL_INPUT');

  // The default palette.
  public exterior02a = 'outlined';
  public control02a = {
    model02a: new FormControl(null, []),
    model02b: new FormControl(null /*'Hello World'*/, [Validators.required]),
    model02c: new FormControl('Hello World', []),
    model02d: new FormControl('Hello World', []),
  };
  public formGroup02a: FormGroup = new FormGroup(this.control02a);

  // Palette like Bootstrap.
  public control02b = {
    model02e: new FormControl(null, []),
    model02f: new FormControl(null /*'Hello World'*/, [Validators.required]),
    model02g: new FormControl('Hello World', []),
    model02h: new FormControl('Hello World', []),
  };
  public formGroup02b: FormGroup = new FormGroup(this.control02b);
  public config02b: GlnFrameConfig = {
    // exterior?: GlnFrameExterior | undefined;
    exterior: GlnFrameExterior.outlined,
    frameSize: GlnFrameSize.short,
    // isHoverColor?: boolean | undefined;
    // isLabelShrink?: boolean | undefined;
    // isNoAnimation?: boolean | undefined;
    isNoLabel: true,
    isNoWideBorder: true,
    // labelPd?: number | undefined; // px
  };

  // Palette like Material-UI.
  public exterior02c = 'outlined';
  public control02c = {
    model02i: new FormControl(null, []),
    model02j: new FormControl(null /*'Hello World'*/, [Validators.required]),
    model02k: new FormControl('Hello World', []),
    model02l: new FormControl('Hello World', []),
  };
  public formGroup02c: FormGroup = new FormGroup(this.control02c);
  public config02c: GlnFrameConfig = {
    // exterior?: GlnFrameExterior | undefined;
    exterior: GlnFrameExterior.outlined,
    frameSize: GlnFrameSize.short,
    // isHoverColor?: boolean | undefined;
    // isLabelShrink?: boolean | undefined;
    // isNoAnimation?: boolean | undefined;
    isNoLabel: true,
    isNoWideBorder: true,
    // labelPd?: number | undefined; // px
  };
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
