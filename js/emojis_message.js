$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV2.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Total  Messages'],
        average_characters: row['Average  Characters  Length'],
        emojis: row['Emoji  Count']
      }
    })

    var processed_data = {};
    processed_data['chat_names'] = [];
    // processed_data['total_messages'] = [];
    processed_data['emojis'] = [];
    for (i = 0; i < data_raw.length; i++) {
      processed_data['chat_names'].push(data_raw[i].chat_names.slice(0, -4));
      // processed_data['total_messages'].push(data_raw[i].total_messages);
      // console.log(data_raw[i].average_characters)
      processed_data['emojis'].push(data_raw[i].emojis * 100 / (data_raw[i].total_messages * data_raw[i].average_characters));
    }

    new Chart(document.getElementById("emojis_message"), {
      type: 'horizontalBar',
      data: {
        labels: processed_data['chat_names'],
        datasets: [{
          label: 'Emojis per 100 characters',
          data: processed_data['emojis'],
          backgroundColor: function (context) {
            var index = context.dataIndex;
            var value = processed_data['chat_names'][index];
            return chat_names[value];
          },
        }]
      },
      options: {
        responsive: true,
        legend: { display: false },
        title: {
          display: true,
          text: 'Emojis per 100 characters'
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