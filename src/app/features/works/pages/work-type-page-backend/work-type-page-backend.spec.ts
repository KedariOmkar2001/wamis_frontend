import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTypePageBackend } from './work-type-page-backend';

describe('WorkTypePageBackend', () => {
  let component: WorkTypePageBackend;
  let fixture: ComponentFixture<WorkTypePageBackend>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkTypePageBackend]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTypePageBackend);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
