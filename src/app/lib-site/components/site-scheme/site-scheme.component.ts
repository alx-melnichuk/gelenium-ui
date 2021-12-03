import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-site-scheme',
  templateUrl: './site-scheme.component.html',
  styleUrls: ['./site-scheme.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteSchemeComponent {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
