import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkTypeDialog } from './edit-work-type-dialog';

describe('EditWorkTypeDialog', () => {
  let component: EditWorkTypeDialog;
  let fixture: ComponentFixture<EditWorkTypeDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditWorkTypeDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditWorkTypeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
