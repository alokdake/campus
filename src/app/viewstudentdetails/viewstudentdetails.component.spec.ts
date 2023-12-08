import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstudentdetailsComponent } from './viewstudentdetails.component';

describe('ViewstudentdetailsComponent', () => {
  let component: ViewstudentdetailsComponent;
  let fixture: ComponentFixture<ViewstudentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewstudentdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewstudentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
