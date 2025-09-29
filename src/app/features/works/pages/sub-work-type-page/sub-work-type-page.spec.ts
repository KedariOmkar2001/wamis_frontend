import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubWorkTypePage } from './sub-work-type-page';

describe('SubWorkTypePage', () => {
  let component: SubWorkTypePage;
  let fixture: ComponentFixture<SubWorkTypePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubWorkTypePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubWorkTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
