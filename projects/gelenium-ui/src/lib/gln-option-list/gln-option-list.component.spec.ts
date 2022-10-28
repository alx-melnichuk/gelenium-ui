import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnOptionListComponent } from './gln-option-list.component';

describe('GlnOptionListComponent', () => {
  let component: GlnOptionListComponent;
  let fixture: ComponentFixture<GlnOptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlnOptionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlnOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
