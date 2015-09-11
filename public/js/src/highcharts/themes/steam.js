Highcharts.theme = {
    colors: ['#66C0F4'],
    chart: {
        backgroundColor: null,
    },
    credits: { enabled: false },
    legend: {
        itemStyle: {
            color: '#8f98a0'
        }
    },
    plotOptions: { areaspline: { marker: { enabled: false } } },
    title: {
        style: {
            color: '#66C0F4',
            fontSize: '1.7em',
            fontFamily: 'Arial, Helvetica, Verdana, sans-serif'
        }
    },
    xAxis: { gridLineColor: null },
    yAxis: { gridLineColor: null }
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);