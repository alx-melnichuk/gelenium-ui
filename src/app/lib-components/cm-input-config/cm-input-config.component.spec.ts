import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmInputConfigComponent } from './cm-input-config.component';

describe('CmInputConfigComponent', () => {
  let component: CmInputConfigComponent;
  let fixture: ComponentFixture<CmInputConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CmInputConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CmInputConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
