import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-frame-input',
  templateUrl: './frame-input.component.html',
  styleUrls: ['./frame-input.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameInputComponent {
  public showNum = '';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
