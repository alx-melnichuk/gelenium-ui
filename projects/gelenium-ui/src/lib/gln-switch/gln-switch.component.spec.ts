import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnSwitchComponent } from './gln-switch.component';

describe('GlnSwitchComponent', () => {
  let component: GlnSwitchComponent;
  let fixture: ComponentFixture<GlnSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlnSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
