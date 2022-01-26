import { AfterViewInit, ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { AnchorScrollerService } from 'src/app/lib-core/services/anchor-scroller.service';

import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements AfterViewInit {
  public showNum = '';
  public urlFrameInput = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_FRAME_INPUT');

  constructor(private anchorScrollerService: AnchorScrollerService) {
    // eslint-disable-next-line no-restricted-syntax
    console.time('InputComponent');
  }

  ngAfterViewInit(): void {
    // eslint-disable-next-line no-restricted-syntax
    console.timeEnd('InputComponent');
    Promise.resolve().then(() => {
      this.anchorScrollerService.scrollByFragmentFromPath();
    });
  }
}
