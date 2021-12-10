import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-regex-remove-api',
  templateUrl: './regex-remove-api.component.html',
  styleUrls: ['./regex-remove-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexRemoveApiComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
