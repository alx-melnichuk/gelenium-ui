import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

import {
  LABEL_CSS,
  LABEL_HTML,
  LABEL_OUTLINED,
  LABEL_SHOW_SOURCE,
  LABEL_STANDARD,
  LABEL_TS,
  LABEL_UNDERLINE,
} from 'src/app/lib-core/constants/constants';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-frame-attributes',
  templateUrl: './frame-attributes.component.html',
  styleUrls: ['./frame-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameAttributesComponent {
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

  public urlFrame = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME');

  public exterior02a = 'outlined';

  public input02a = '';
  public input02b = 'Hello World';
  public input02c = 'Hello World';
  public input02d = 'Hello World';

  public exterior02b = 'outlined';

  public input02e = '';
  public input02f = '';
  public input02g = 'Hello World';

  public exterior02c = 'outlined';

  public input02h = 'Hello World';
  public input02i = 'Hello World';
  public input02j = 'Hello World';

  public config02 = {
    frameSizeValue: 57,
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
