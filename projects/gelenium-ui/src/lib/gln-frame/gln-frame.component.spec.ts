import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnFrameComponent } from './gln-frame.component';

describe('GlnFrameComponent', () => {
  let component: GlnFrameComponent;
  let fixture: ComponentFixture<GlnFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlnFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
