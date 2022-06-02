import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnHintOrErrorComponent } from './grn-hint-or-error.component';

describe('GrnHintOrErrorComponent', () => {
  let component: GrnHintOrErrorComponent;
  let fixture: ComponentFixture<GrnHintOrErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrnHintOrErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnHintOrErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
