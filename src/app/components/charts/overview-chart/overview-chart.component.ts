import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'sc-overview-chart',
  templateUrl: './overview-chart.component.html',
  styleUrls: ['./overview-chart.component.css']
})
export class OverviewChartComponent implements OnInit {
  games: boolean = false;

  chartOptions = new FormGroup({
    showUnplayed: new FormControl(),
    showUnachieved: new FormControl(),
    showPerfectOnly: new FormControl()
  });

  constructor() { }

  ngOnInit() {
  }

}
