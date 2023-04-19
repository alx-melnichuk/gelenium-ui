import { PortalOutlet } from '@angular/cdk/portal';

export class GlnSnackbar2Ref<T> {
  /** The instance of the component making up the content of the snack bar. */
  instance!: T;

  constructor(private portalOutlet: PortalOutlet) {}

  /** Marks the snackbar action clicked. */
  public dismissWithAction(): void {}
}
