import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionChartComponent } from './completion-chart.component';

describe('CompletionChartComponent', () => {
  let component: CompletionChartComponent;
  let fixture: ComponentFixture<CompletionChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletionChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
