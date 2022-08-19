import { AfterViewInit, ChangeDetectionStrategy, Component, NgZone, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';

import { ScrollAfterRoutingUtil } from '../../../lib-core/utils/scroll-after-routing.util';
import { UrlUtil } from '../../../lib-core/utils/url.util';

const logLabel = 'Textarea';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements AfterViewInit {
  public showNum = '';

  public urlFrame1 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');
  public urlFrame2 = '/' + UrlUtil.get('URL_COMPONENTS') + '/' + UrlUtil.get('URL_FRAME');
  public urlPlTextarea = '/' + UrlUtil.get('URL_PALETTE') + '/' + UrlUtil.get('URL_TEXTAREA');

  constructor(private ngZone: NgZone) {
    // eslint-disable-next-line no-restricted-syntax
    console.time(logLabel);
  }

  public ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      ScrollAfterRoutingUtil.scrollByFragmentFromPath();
    });
    // The zone will become stable when all components have fully rendered.
    this.ngZone.onStable.pipe(take(1)).subscribe(() => {
      // eslint-disable-next-line no-restricted-syntax
      console.timeEnd(logLabel);
    });
  }
}
