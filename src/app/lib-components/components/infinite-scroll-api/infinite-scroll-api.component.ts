import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-api',
  templateUrl: './infinite-scroll-api.component.html',
  styleUrls: ['./infinite-scroll-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollApiComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
