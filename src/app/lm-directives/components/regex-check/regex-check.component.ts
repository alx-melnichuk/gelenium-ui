import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-regex-check',
  templateUrl: './regex-check.component.html',
  styleUrls: ['./regex-check.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexCheckComponent {
  public showNum = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
