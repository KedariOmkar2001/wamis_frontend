import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSubTypePage } from './work-sub-type-page';

describe('WorkSubTypePage', () => {
  let component: WorkSubTypePage;
  let fixture: ComponentFixture<WorkSubTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkSubTypePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkSubTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
