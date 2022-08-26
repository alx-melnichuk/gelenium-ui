import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInfiniteScrollBasicComponent } from './cm-infinite-scroll-basic.component';

describe('CmInfiniteScrollBasicComponent', () => {
  let component: CmInfiniteScrollBasicComponent;
  let fixture: ComponentFixture<CmInfiniteScrollBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInfiniteScrollBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInfiniteScrollBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
