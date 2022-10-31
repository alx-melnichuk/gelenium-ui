import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, NgZone, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';

import { RouterConfig } from '../../lib-core/config/router-config';
import { ScrollAfterRoutingUtil } from '../../lib-core/utils/scroll-after-routing.util';

const logLabel = 'ComponentsSelect';

@Component({
  selector: 'app-cm-select',
  templateUrl: './cm-select.component.html',
  styleUrls: ['./cm-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmSelectComponent implements AfterViewInit {
  public showNum = '';

  public urlCmFrame = '/' + RouterConfig.get('URL_COMPONENTS') + '/' + RouterConfig.get('URL_COMPONENTS_FRAME');
  public urlPlSelect = '/' + RouterConfig.get('URL_PALETTE') + '/' + RouterConfig.get('URL_PALETTE_SELECT');

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
      console.timeEnd(logLabel); // 800ms - 850ms
    });

    // document.getElementById(fragment)?.scrollIntoView();
    // const data: HTMLCollectionOf<Element> = document.getElementsByTagName('app-site-scheme');
    // const elem: Element | null = data.length > 0 ? data[0] : null;
    // const block: Element | null = elem && elem.children.length > 1 ? elem.children[1] : null;
  }

  // @HostListener('scroll', ['$event'])
  // public doScroll(event: any): void {
  //   console.log('doScroll()', event); // event.srcElement.scrollLeft, $event.srcElement.scrollTop);
  // }
  // @HostListener('window:scroll', ['$event'])
  // public doWindowScroll(event: any): void {
  //   console.log('doWindowScroll()', event); // event.srcElement.scrollLeft, $event.srcElement.scrollTop);
  // }
}
