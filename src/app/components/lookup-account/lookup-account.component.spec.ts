import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupAccountComponent } from './lookup-account.component';

describe('LookupAccountComponent', () => {
  let component: LookupAccountComponent;
  let fixture: ComponentFixture<LookupAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
