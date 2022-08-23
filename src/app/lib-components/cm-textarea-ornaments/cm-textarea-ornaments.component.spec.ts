import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmTextareaOrnamentsComponent } from './cm-textarea-ornaments.component';

describe('CmTextareaOrnamentsComponent', () => {
  let component: CmTextareaOrnamentsComponent;
  let fixture: ComponentFixture<CmTextareaOrnamentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmTextareaOrnamentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmTextareaOrnamentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
