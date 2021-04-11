$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV2.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Total  Messages'],
        average_characters: row['Average  Characters  Length'],
        links: row['Total  links'],
      }
    })

    var processed_data = {};
    processed_data['chat_names'] = [];
    processed_data['average_characters'] = [];
    processed_data['total_messages'] = [];
    
    for (i = 0; i < data_raw.length; i++) {
      processed_data['chat_names'].push(data_raw[i].chat_names.slice(0, -4));
      processed_data['average_characters'].push(data_raw[i].total_messages);
      processed_data['total_messages'].push(data_raw[i].total_messages);
    }


    var chat_colors = [];

    for (i = 0; i < processed_data['chat_names'].length; i++) {
      chat_colors.push(chat_names[processed_data['chat_names'][i]]);
    }

    var dataset = []
    
    processed_data['links'] = []

    for (i = 0; i < data_raw.length; i++) {
      chat_name = processed_data['chat_names'][i];
      processed_data['links'].push((100 * data_raw[i].links / (processed_data['average_characters'][i] * processed_data['total_messages'][i]).toFixed(2)));
    }
      dataset.push({
        label: 'Links',
        data: processed_data['links'],
        backgroundColor: chat_colors
      })

    new Chart(document.getElementById("links"), {
      type: 'horizontalBar',
      data: {
        labels: processed_data['chat_names'],
        datasets: dataset,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
          display: true,
          text: 'Links per 100 characters'
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: true,
            },
          }],
          yAxes: [{
            stacked: true,
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