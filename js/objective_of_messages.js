$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV3.csv', function (csvString) {

    // var rows = Papa.parse(csvString, { header: true }).data;

    // var data_raw = rows.map(function (row) {
    //   return {
    //     chat_names: row['Chat  Name'],
    //     total_messages: row['Total  Messages']
    //   }
    // })

    // var processed_data = {};
    // processed_data['chat_names'] = [];
    // processed_data['total_messages'] = [];
    // for (i = 0; i < data_raw.length; i++) {
    //   processed_data['chat_names'].push(data_raw[i].chat_names.slice(0, -4));
    //   processed_data['total_messages'].push((data_raw[i].total_messages * 1).toFixed(0));
    // }

    new Chart(document.getElementById("objective_of_messages"), {
      type: 'doughnut',
      data: {
        labels: ['Engagement only', 'Distribution and engagement', 'Distribution only'],
        datasets: [{
          // label: 'Total messages',
          data: [1.5,11.3,87.2],
          backgroundColor: ['#ffd166', '#06d6a0', '#118ab2']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // legend: { display: false },
        title: {
          display: true,
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false,
            }
          }],
          yAxes: [{
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              display: false
            }
          }]
        },
        tooltips: {
          displayColors: false,
          callbacks: {
            label: function (t, d) {
              return d.labels[t.index] + ': ' + d.datasets[t.datasetIndex].data[t.index] + ' %';
            }
          }
        },
        plugins: {
          deferred: {           // enabled by default
            xOffset: 150,     // defer until 150px of the canvas width are inside the viewport
            yOffset: '50%',   // defer until 50% of the canvas height are inside the viewport
            delay: 500        // delay of 500 ms after the canvas is considered inside the viewport
          }
        },
      }
    });

  });
});