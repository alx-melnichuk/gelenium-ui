import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInfiniteScrollApiComponent } from './cm-infinite-scroll-api.component';

describe('CmInfiniteScrollApiComponent', () => {
  let component: CmInfiniteScrollApiComponent;
  let fixture: ComponentFixture<CmInfiniteScrollApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInfiniteScrollApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInfiniteScrollApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
