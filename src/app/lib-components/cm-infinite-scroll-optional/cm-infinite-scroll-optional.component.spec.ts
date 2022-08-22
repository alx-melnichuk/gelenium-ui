import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInfiniteScrollOptionalComponent } from './cm-infinite-scroll-optional.component';

describe('CmInfiniteScrollOptionalComponent', () => {
  let component: CmInfiniteScrollOptionalComponent;
  let fixture: ComponentFixture<CmInfiniteScrollOptionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInfiniteScrollOptionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInfiniteScrollOptionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
