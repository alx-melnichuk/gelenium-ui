import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnInfiniteScrollComponent } from './grn-infinite-scroll.component';

describe('GrnInfiniteScrollComponent', () => {
  let component: GrnInfiniteScrollComponent;
  let fixture: ComponentFixture<GrnInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnInfiniteScrollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
