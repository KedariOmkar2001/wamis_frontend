import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInUser } from './logged-in-user';

describe('LoggedInUser', () => {
  let component: LoggedInUser;
  let fixture: ComponentFixture<LoggedInUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggedInUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggedInUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
