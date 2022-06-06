import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnInfiniteScrollComponent } from './gln-infinite-scroll.component';

describe('GlnInfiniteScrollComponent', () => {
  let component: GlnInfiniteScrollComponent;
  let fixture: ComponentFixture<GlnInfiniteScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnInfiniteScrollComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnInfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
