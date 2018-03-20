import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfectGamesComponent } from './perfect-games.component';

describe('PerfectGamesComponent', () => {
  let component: PerfectGamesComponent;
  let fixture: ComponentFixture<PerfectGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfectGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfectGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
