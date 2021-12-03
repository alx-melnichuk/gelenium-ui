import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-regex-check-basic',
  templateUrl: './regex-check-basic.component.html',
  styleUrls: ['./regex-check-basic.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegexCheckBasicComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
