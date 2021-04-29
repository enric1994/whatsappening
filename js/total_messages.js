$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV3.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Total  Messages']
      }
    })

    var processed_data = {};
    processed_data['chat_names'] = [];
    processed_data['total_messages'] = [];
    for (i = 0; i < data_raw.length; i++) {
      processed_data['chat_names'].push(data_raw[i].chat_names.slice(0, -4));
      processed_data['total_messages'].push((data_raw[i].total_messages * 1).toFixed(0));
    }

    new Chart(document.getElementById("total_messages"), {
      type: 'doughnut',
      data: {
        labels: processed_data['chat_names'],
        datasets: [{
          label: 'Total messages',
          data: processed_data['total_messages'],
          backgroundColor: function (context) {
            var index = context.dataIndex;
            var value = processed_data['chat_names'][index];
            return chat_names[value];
          },
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
          display: false,
          // text: 'Total messages'
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
            title: function(a,b){
              return b.labels[a[0].index];
            },
            label: function (t, d) {
              return 'Total messages: ' + d.datasets[0].data[t.index];
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