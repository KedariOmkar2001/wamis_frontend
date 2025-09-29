import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroCarousal } from './hero-carousal';

describe('HeroCarousal', () => {
  let component: HeroCarousal;
  let fixture: ComponentFixture<HeroCarousal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroCarousal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroCarousal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
