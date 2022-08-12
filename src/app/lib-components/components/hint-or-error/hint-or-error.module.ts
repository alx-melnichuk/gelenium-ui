import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenuUtil, SiteUrl } from '../../../lib-core/utils/site-menu.util';
import { UrlComponents } from '../../../lm-components/constants/url-components.constants';

import { HintOrErrorComponent } from './hint-or-error.component';
import { HintOrErrorBasicModule } from '../hint-or-error-basic/hint-or-error-basic.module';
import { HintOrErrorApiModule } from '../hint-or-error-api/hint-or-error-api.module';

UrlComponents.add('URL_HINT_OR_ERROR', 'hint-or-error');

const url = '/' + UrlComponents.get('URL_COMPONENTS') + '/' + UrlComponents.get('URL_HINT_OR_ERROR');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenuUtil.addItem('Components', 'HintOrError', { label: 'HintOrError', siteUrls });

@NgModule({
  declarations: [HintOrErrorComponent],
  imports: [CommonModule, HintOrErrorBasicModule, HintOrErrorApiModule],
  exports: [HintOrErrorComponent],
})
export class HintOrErrorModule {}
