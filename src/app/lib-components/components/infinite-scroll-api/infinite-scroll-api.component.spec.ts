import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollApiComponent } from './infinite-scroll-api.component';

describe('InfiniteScrollApiComponent', () => {
  let component: InfiniteScrollApiComponent;
  let fixture: ComponentFixture<InfiniteScrollApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfiniteScrollApiComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
