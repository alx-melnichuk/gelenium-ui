import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteMenu, SiteUrl } from 'src/app/lib-core/constants/site-menu';
import { UrlDirectives } from 'src/app/lm-directives/constants/url-directives.constants';

import { AutoFocuseBasicModule } from '../auto-focuse-basic/auto-focuse-basic.module';

import { AutoFocuseComponent } from './auto-focuse.component';

UrlDirectives.add('URL_AUTO_FOCUSE', 'auto-focuse');

const url = '/' + UrlDirectives.get('URL_DIRECTIVES') + '/' + UrlDirectives.get('URL_AUTO_FOCUSE');
const siteUrls: SiteUrl[] = [
  { label: 'Basic', url, fragment: 'Basic' },
  { label: 'Api', url, fragment: 'Api' },
];
SiteMenu.addItem('Directives', 'AutoFocuse', { label: 'AutoFocuse', siteUrls });

@NgModule({
  declarations: [AutoFocuseComponent],
  imports: [CommonModule, AutoFocuseBasicModule],
  exports: [AutoFocuseComponent],
})
export class AutoFocuseModule {}
