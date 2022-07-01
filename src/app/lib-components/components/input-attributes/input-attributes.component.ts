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
  selector: 'app-input-attributes',
  templateUrl: './input-attributes.component.html',
  styleUrls: ['./input-attributes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputAttributesComponent {
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

  public model02a = '';
  public model02b = 'Hello World';
  public model02c = 'Hello World';
  public model02d = 'Hello World';

  public exterior02b = 'outlined';

  public model02e = '';
  public model02f = '';
  public model02g = 'Hello World';
  public model02h = 'Hello World';

  public exterior02c = 'outlined';

  public model02i = '';
  public model02j = '';
  public model02k = 'Hello World';
  public model02l = '';

  public exterior02d = 'outlined';

  public model02m = '';
  public model02n = '#000000';
  public model02o = '';
  public model02p = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
