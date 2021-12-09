import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-regex-match',
  templateUrl: './regex-match.component.html',
  styleUrls: ['./regex-match.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexMatchComponent {
  public showNum = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
