import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScrollAfterRoutingUtil } from 'src/app/lib-core/utils/scroll-after-routing.util';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements AfterViewInit {
  public showNum = '02';
  public urlFrameInput = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME_INPUT');

  constructor() {
    // eslint-disable-next-line no-restricted-syntax
    console.time('InputComponent');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('InputComponent');
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
  }
}
