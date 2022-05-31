import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-frame-api',
  templateUrl: './frame-api.component.html',
  styleUrls: ['./frame-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameApiComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
