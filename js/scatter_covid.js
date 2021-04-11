$(document).ready(function () {

  // Read data file and create a chart
  $.get('./features_50V2.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data = rows.map(function (row) {
      return {
        x: row['d1'],
        y: row['d2'],
        name: row['sentences'],
        chat: row['chat']
      }
    })

    var scatterChartData = {
      datasets: [{
        label: '',
        data: data,
        pointRadius: 4,
        pointHoverRadius: 4 + 2,
        pointBackgroundColor: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index].chat;
          if(value=='GZH Coronavirus'){
            return 'green'
          }else{
            return 'white'
          }
          // return chat_names[value];

        }
      }]
    };

    var ctx = document.getElementById('scatter_covid').getContext('2d');

    Chart.Scatter(ctx, {
      data: scatterChartData,
      options: {
        title: {
          display: true,
          text: 'green=covidGHZ',
          fontSize: 14,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
            },
          }],
          yAxes: [{
            gridLines: {
              display: true,
            },
          }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label: function (tooltipItem, all) {
              return '';
            },
            title: function (tooltipItem, all) {
              return [all.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].chat + ': ',
              all.datasets[tooltipItem[0].datasetIndex].data[tooltipItem[0].index].name,

              ]
            },
          }
        }
      }
    });

  });

});