$(document).ready(function () {

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

    joinville = [
      'O Mirante Joinville',
      'O Município Joinville'
      ]
      
      porto_alegre = [
      'Jornal do Comércio',
      'GaúchaZH',
      'Matinal'
      ]
      
      curitiba = [
      'Gazeta do Povo Local',
      'Gazeta do Povo',
      'Tribuna do Paraná'
      ]



    var scatterChartData = {
      datasets: [{
        label: '',
        data: data,
        pointRadius: 2,
        pointHoverRadius: 3.5 + 2,
        pointBackgroundColor: function (context) {
          var index = context.dataIndex;
          var value = context.dataset.data[index].chat;
          if(value=='O Mirante Joinville' || value=='O Município Joinville'){
            return 'orange';
          }else if(value=='Jornal do Comércio' || value == 'GaúchaZH' || value == 'Matinal'){
            return 'blue';
          }else if(value=='Gazeta do Povo Local' || value == 'Gazeta do Povo' || value=='Tribuna do Paraná'){
            return 'black'
          }else{
            return 'white';
          }
          // return chat_names[value];

        }
      }]
    };

    var ctx = document.getElementById('scatter_cities').getContext('2d');

    Chart.Scatter(ctx, {
      data: scatterChartData,
      options: {
        title: {
          display: true,
          text: 'orange=Joinville, blue=Porto Alegre, black=Curitiba',
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