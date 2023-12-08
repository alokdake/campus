import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstudentdetailsbyadminComponent } from './editstudentdetailsbyadmin.component';

describe('EditstudentdetailsbyadminComponent', () => {
  let component: EditstudentdetailsbyadminComponent;
  let fixture: ComponentFixture<EditstudentdetailsbyadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditstudentdetailsbyadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditstudentdetailsbyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
