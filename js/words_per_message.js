$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV2.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Average  Characters  Length']
      }
    })

    var processed_data = {};
    processed_data['chat_names'] = [];
    processed_data['avg_characters'] = [];
    for (i = 0; i < data_raw.length; i++) {
      processed_data['chat_names'].push(data_raw[i].chat_names.slice(0, -4));
      processed_data['avg_characters'].push(data_raw[i].total_messages);
    }

    new Chart(document.getElementById("words_per_message"), {
      type: 'horizontalBar',
      data: {
        labels: processed_data['chat_names'],
        datasets: [{
          label: 'Total messages',
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
          text: 'Average characters'
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: true,
            },
          }],
          yAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              display: false
            }
          }]
        },
      }
    });

  });
});