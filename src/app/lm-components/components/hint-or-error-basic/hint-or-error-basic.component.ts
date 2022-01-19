import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-hint-or-error-basic',
  templateUrl: './hint-or-error-basic.component.html',
  styleUrls: ['./hint-or-error-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HintOrErrorBasicComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
