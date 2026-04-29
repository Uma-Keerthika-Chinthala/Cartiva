import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeDealsSectionComponent } from './prime-deals-section.component';

describe('PrimeDealsSectionComponent', () => {
  let component: PrimeDealsSectionComponent;
  let fixture: ComponentFixture<PrimeDealsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeDealsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeDealsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
