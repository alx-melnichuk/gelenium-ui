import { ComponentType } from '@angular/cdk/portal';
import { EmbeddedViewRef, Injectable, OnDestroy, TemplateRef } from '@angular/core';

import { GlnSnackbarAlert } from './gln-snackbar-alert.component';
import { GlnSnackbarConfig } from './gln-snackbar-config.interface';
import { GlnSnackbarRef } from './gln-snackbar-reference';
import { GlnSnackbarModule } from './gln-snackbar.module';
import { GlnSnackbarUtil } from './gln-snackbar.util';

@Injectable({
  providedIn: GlnSnackbarModule,
})
export class GlnSnackbarService implements OnDestroy {
  constructor() {
    console.log(`GlnSnackbarService();`); // #
  }

  public ngOnDestroy(): void {
    GlnSnackbarUtil.clear();
  }

  // ** Public methods **

  public getConfig(): GlnSnackbarConfig {
    return GlnSnackbarUtil.getConfig();
  }
  public setConfig(config: GlnSnackbarConfig): void {
    GlnSnackbarUtil.setConfig(config);
  }

  public openFromComponent<T>(component: ComponentType<T>, config?: GlnSnackbarConfig): GlnSnackbarRef<T> {
    return GlnSnackbarUtil.openFromComponent<T>(component, config) as GlnSnackbarRef<T>;
  }

  public openFromTemplate(template: TemplateRef<any>, config?: GlnSnackbarConfig): GlnSnackbarRef<EmbeddedViewRef<any>> {
    return GlnSnackbarUtil.openFromTemplate(template, config) as GlnSnackbarRef<EmbeddedViewRef<any>>;
  }

  public open(message: string, action: string = '', config?: GlnSnackbarConfig): GlnSnackbarRef<GlnSnackbarAlert> {
    return GlnSnackbarUtil.open(message, action, config);
  }
}
