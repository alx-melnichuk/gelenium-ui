import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlnPaginationComponent } from './gln-pagination.component';

describe('GlnPaginationComponent', () => {
  let component: GlnPaginationComponent;
  let fixture: ComponentFixture<GlnPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlnPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlnPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
