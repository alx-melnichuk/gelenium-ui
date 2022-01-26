import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AnchorScrollerService } from 'src/app/lib-core/services/anchor-scroller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'geranium-demo';

  constructor(private anchorScrollerService: AnchorScrollerService) {}

  ngOnInit(): void {
    this.anchorScrollerService.listenForRouterEvents();
  }
}
