import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTypePage } from './work-type-page';

describe('WorkTypePage', () => {
  let component: WorkTypePage;
  let fixture: ComponentFixture<WorkTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkTypePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
