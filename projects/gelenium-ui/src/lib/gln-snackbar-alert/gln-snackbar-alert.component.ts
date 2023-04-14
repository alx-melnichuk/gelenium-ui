import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'gln-snackbar-alert',
  templateUrl: './gln-snackbar-alert.component.html',
  styleUrls: ['./gln-snackbar-alert.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlnSnackbarAlertComponent implements OnInit {
  @Input()
  public content: Record<string, unknown> | null = null;
  @Input()
  public text: string | null | undefined = null;
  @Input()
  public templateRef: TemplateRef<unknown> | null = null;

  constructor() {}

  public ngOnInit(): void {
    console.log(`GlnSnackbarAlert();`); // #
  }
}
