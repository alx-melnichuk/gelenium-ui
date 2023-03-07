import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnLayerComponent } from './gln-layer.component';

describe('GlnLayerComponent', () => {
  let component: GlnLayerComponent;
  let fixture: ComponentFixture<GlnLayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnLayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlnLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
