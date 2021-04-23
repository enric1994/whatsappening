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
        pointRadius: 2.5,
        pointHoverRadius: 2.5 + 2,
        pointBackgroundColor: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index].chat;
          return chat_names[value] + 'BB';

        }
      }]
    };

    var ctx = document.getElementById('scatter-1').getContext('2d');

    Chart.Scatter(ctx, {
      data: scatterChartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true,
          text: '???',
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
        },
        // plugins: {
        //   deferred: {           // enabled by default
        //     xOffset: 150,     // defer until 150px of the canvas width are inside the viewport
        //     yOffset: '50%',   // defer until 50% of the canvas height are inside the viewport
        //     delay: 500        // delay of 500 ms after the canvas is considered inside the viewport
        //   }
        // },
      }
    });

  });

});