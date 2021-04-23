$(document).ready(function () {

  // Read data file and create a chart
  $.get('./engagements.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat name'],
        total_messages: row['Percentage']
      }
    })

    var processed_data = {};
    processed_data['chat_names'] = [];
    processed_data['avg_characters'] = [];
    for (i = 0; i < data_raw.length; i++) {
      processed_data['chat_names'].push(data_raw[i].chat_names);
      processed_data['avg_characters'].push((1*data_raw[i].total_messages).toFixed(2));
    }

    new Chart(document.getElementById("call_engagements"), {
      type: 'horizontalBar',
      data: {
        labels: processed_data['chat_names'],
        datasets: [{
          // label: 'Average characters per message',
          data: processed_data['avg_characters'],
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
          display: true,
          // text: 'Average characters per message'
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
            },
            ticks: {
            callback: function (label, index, labels) {
              return label + '%';
            }
          }
          }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Channels',
          },
          gridLines: {
            display: false,
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
            return d.datasets[t.datasetIndex].data[t.index] + '% messages call to engage';
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