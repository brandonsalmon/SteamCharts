import { Component, OnInit } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/app.store';

let $ = (selector: any) => { return { highcharts: (config: any) => { return { highcharts: () => config }; } } };
let humanizeDuration = (value: number) => { return value; }

@Component({
  selector: 'sc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subscriptions: any = {};
  games: any[];
  perfectGames = [];
  chart;
  chart2;
  chart3;
  chart4;
  chart5;
  chart6;

  constructor(private ngRedux: NgRedux<IAppState>) {
    this.subscriptions.totalGames = ngRedux.select<number>(x => x.games, (x, y) => false).subscribe(x => this.games = Object.values(x))
  }

  ngOnInit() {
    this.chart = $('#chart').highcharts({
      chart: {
        type: 'areaspline',
        inverted: false,
        backgroundColor: null
      },
      title: { text: 'Games by Completion' },
      series: [{ name: 'Number of games' }],
      xAxis: {
        min: 0,
        max: 100,
        labels: { format: '{value:,.0f}%' }
      }
    }).highcharts();
    this.chart2 = $('#chart2').highcharts({
      chart: { type: 'area', zoomType: 'x', height: 600 },
      plotOptions: {
        column: {
          pointPadding: 0,
          groupPadding: 0.1,
          borderWidth: 0,
          shadow: false
        },
        area: {
          lineWidth: 0,
          marker: { enabled: false }
        },
        line: {
          marker: { enabled: false }
        }
      },
      series: [
        { name: 'Percent of Achievements Earned' },
        { name: 'Time Played', yAxis: 1 },
        { name: 'Number of Achievements Earned', yAxis: 2 },
        { name: 'Total Number of Achievements', yAxis: 2 }
      ],
      title: { text: null },
      tooltip: {
        shared: true,
        valueDecimals: 0
      },
      xAxis: {
        categories: [],
        labels: {
          enabled: true
        },
        tickWidth: 0
      },
      yAxis: [
        {
          min: 0,
          title: { text: null },
          labels: {
            enabled: false, format: '{value:,.0f}%'
          }
        },
        {
          title: { text: null },
          min: 0,
          labels: {
            enabled: false,
            formatter: function () { return humanizeDuration(this.value * 60 * 1000); }
          }
        },
        {
          min: 0,
          title: { text: null },
          labels: {
            enabled: false
          }
        }
      ]
    }).highcharts();
    this.chart3 = $('#chart3').highcharts({
      chart: { type: 'scatter', zoomType: 'x', backgroundColor: null },
      title: { text: 'Value per Achievement' },
      series: [{ name: 'Games' }],
      tooltip: {
        valueDecimals: 2,
        valueSuffix: '%'
      },
      xAxis: {
        title: { text: 'Remaining' },
        labels: {
          enabled: false
        }
      },
      yAxis: {
        title: { text: '% per achievement' },
        labels: { format: '{value:,.2f}%' },
        min: 0
      }
    }).highcharts();
    this.chart4 = $('#chart4').highcharts({
      chart: { type: 'pie', backgroundColor: null },
      plotOptions: {
        pie: {
          //startAngle: 270
        }
      },
      title: { text: 'Playtime' },
      tooltip: {
        pointFormatter: function () { return humanizeDuration(this.y * 60 * 1000); }
      },
      series: [{ name: 'Games' }]
    }).highcharts();
    this.chart5 = $('#chart5').highcharts({
      chart: { type: 'areaspline', backgroundColor: null, zoomType: 'x' },
      series: [{ name: 'Games' }],
      title: { text: 'Time per Achievement' },
      tooltip: {
        pointFormatter: function () { return humanizeDuration(this.y * 60 * 1000); }
      },
      xAxis: {
        categories: [],
        labels: {
          enabled: false
        }
      }
    }).highcharts();
    this.chart6 = $('#chart6').highcharts({
      chart: { type: 'areaspline', backgroundColor: null, zoomType: 'x' },
      series: [{ name: 'Games' }],
      title: { text: 'Time per Achievement for Perfect Games' },
      tooltip: {
        pointFormatter: function () { return humanizeDuration(this.y * 60 * 1000); }
      },
      xAxis: {
        categories: [],
        labels: {
          enabled: false
        }
      }
    }).highcharts();
  }
}
