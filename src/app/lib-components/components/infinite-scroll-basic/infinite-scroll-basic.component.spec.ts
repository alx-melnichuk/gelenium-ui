import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollBasicComponent } from './infinite-scroll-basic.component';

describe('InfiniteScrollBasicComponent', () => {
  let component: InfiniteScrollBasicComponent;
  let fixture: ComponentFixture<InfiniteScrollBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfiniteScrollBasicComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
