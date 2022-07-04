import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from '../../../lib-core/constants/site-menu';
import { UrlDirectives } from 'src/app/lm-directives/constants/url-directives.constants';

import { RegexRemoveBasicModule } from '../regex-remove-basic/regex-remove-basic.module';
import { RegexRemoveApiModule } from '../regex-remove-api/regex-remove-api.module';

import { RegexRemoveComponent } from './regex-remove.component';

UrlDirectives.add('URL_REGEX_REMOVE', 'regex-remove');

const url = '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_REGEX_REMOVE');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Directives', 'RegexRemove', { label: 'RegexRemove', siteUrls });

@NgModule({
  declarations: [RegexRemoveComponent],
  imports: [CommonModule, RegexRemoveBasicModule, RegexRemoveApiModule],
  exports: [RegexRemoveComponent],
})
export class RegexRemoveModule {}
