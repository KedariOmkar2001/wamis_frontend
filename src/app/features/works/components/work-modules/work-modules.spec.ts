import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkModules } from './work-modules';

describe('WorkModules', () => {
  let component: WorkModules;
  let fixture: ComponentFixture<WorkModules>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkModules]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkModules);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
