$(document).ready(function () {

  var TITLE = 'Title';

  var POINT_NAME = 'sentences'; // point names that appear in tooltip
  var POINT_COLOR = 'rgba(0,0,255,0.7)'; // eg `black` or `rgba(10,100,44,0.8)`
  var POINT_RADIUS = 3.5; // radius of each data point

  var SHOW_GRID = true; // `true` to show the grid, `false` to hide

  var chat_names = {}
  chat_names['Aos Fatos'] = 'blue'
  chat_names['Correio Sabiá'] = 'red'
  chat_names['Gazeta do Povo Local'] = 'grey'
  chat_names['Gazeta do Povo'] = 'black'
  chat_names['GZH Coronavirus'] = 'green'
  chat_names['GaúchaZH'] = 'pink'
  chat_names['Jornal do Comércio'] = 'orange'
  chat_names['Matinal'] = 'yellow'
  chat_names['O Estado de S. Paulo'] = 'purple'
  chat_names['O Mirante Joinville'] = 'coral'
  chat_names['O Município Joinville'] = 'cyan'
  chat_names['O Município'] = 'lime'
  chat_names['Pública'] = 'olive'
  chat_names['Seu Panorama'] = 'skyblue'
  chat_names['The Intercept Brasil'] = 'tomato'
  chat_names['Tribuna do Paraná'] = 'silver'
  chat_names['UOL Economia+'] = 'peru'
  chat_names['UOL Tilt'] = 'brown'

  // Read data file and create a chart
  $.get('./embeddings_small.csv', function (csvString) {

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
        pointRadius: POINT_RADIUS,
        pointHoverRadius: POINT_RADIUS + 2,
        pointBackgroundColor: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index].chat;
          return chat_names[value];

        }
      }]
    };

    var ctx = document.getElementById('scatter-1').getContext('2d');

    Chart.Scatter(ctx, {
      data: scatterChartData,
      options: {
        title: {
          display: true,
          text: TITLE,
          fontSize: 14,
        },
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            // scaleLabel: {
            //   display: true,
            //   labelString: X_AXIS
            // },
            gridLines: {
              display: SHOW_GRID,
            },
            // ticks: {
            //   callback: function(value) {
            //     return value.toLocaleString();
            //   }
            // }
          }],
          yAxes: [{
            // scaleLabel: {
            //   display: true,
            //   labelString: Y_AXIS
            // },
            gridLines: {
              display: SHOW_GRID,
            },
            // ticks: {
            //   callback: function(value, index, values) {
            //     return POINT_Y_PREFIX + value.toLocaleString() + POINT_Y_POSTFIX;
            //   }
            // }
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
            // label: function(tooltipItem, all) {
            //   return [
            //     X_AXIS + ': ' + POINT_X_PREFIX + tooltipItem.xLabel.toLocaleString() + POINT_X_POSTFIX,
            //     Y_AXIS + ': ' + POINT_Y_PREFIX + tooltipItem.yLabel.toLocaleString() + POINT_Y_POSTFIX
            //   ]
            // }
          }
        }
      }
    });

  });

});