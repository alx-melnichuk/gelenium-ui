import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-input-api',
  templateUrl: './input-api.component.html',
  styleUrls: ['./input-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputApiComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
