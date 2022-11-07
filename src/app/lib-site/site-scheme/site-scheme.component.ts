import { ChangeDetectionStrategy, Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

import { glnDebounceTimerObjFn } from 'gelenium-ui';

import { CE_SITE_SCHEME_SCROLL } from '../../lib-core/constants';
import { CustomEventUtil } from '../../lib-core/custom-event.util';

@Component({
  selector: 'app-site-scheme',
  templateUrl: './site-scheme.component.html',
  styleUrls: ['./site-scheme.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteSchemeComponent implements OnDestroy {
  public doScroll = (): void => {};

  private debounceTimerObjScroll: { run(...args: any[]): void; clear(): void };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.debounceTimerObjScroll = glnDebounceTimerObjFn(() => this.handlerScroll(), 200);
    this.doScroll = this.debounceTimerObjScroll.run;
  }

  public ngOnDestroy(): void {
    this.debounceTimerObjScroll.clear();
  }

  public handlerScroll(): void {
    CustomEventUtil.emit(CE_SITE_SCHEME_SCROLL);
  }
}
