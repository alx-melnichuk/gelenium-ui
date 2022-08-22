import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInfiniteScrollComponent } from './cm-infinite-scroll.component';

describe('CmInfiniteScrollComponent', () => {
  let component: CmInfiniteScrollComponent;
  let fixture: ComponentFixture<CmInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmInfiniteScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
