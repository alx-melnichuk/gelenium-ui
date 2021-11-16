import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollOptionalComponent } from './infinite-scroll-optional.component';

describe('InfiniteScrollOptionalComponent', () => {
  let component: InfiniteScrollOptionalComponent;
  let fixture: ComponentFixture<InfiniteScrollOptionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfiniteScrollOptionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollOptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
