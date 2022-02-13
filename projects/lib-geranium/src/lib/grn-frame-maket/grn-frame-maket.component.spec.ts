import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnFrameMaketComponent } from './grn-frame-maket.component';

describe('GrnFrameMaketComponent', () => {
  let component: GrnFrameMaketComponent;
  let fixture: ComponentFixture<GrnFrameMaketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrnFrameMaketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnFrameMaketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
