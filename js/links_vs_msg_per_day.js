$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV2.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Total  Messages'],
        links: row['Total  links']
      }
    })

    var total_days = 120;

    var processed_data = {};
    processed_data['chat_names'] = [];
    processed_data['total_messages'] = [];
    processed_data['links'] = [];

    for (i = 0; i < data_raw.length; i++) {
      processed_data['chat_names'].push(data_raw[i].chat_names.slice(0, -4));
      processed_data['total_messages'].push(data_raw[i].total_messages);
      // processed_data['links'].push(data_raw[i].links);
    }


    var chat_colors = [];

    for (i = 0; i < processed_data['chat_names'].length; i++) {
      chat_colors.push(chat_names[processed_data['chat_names'][i]]);
    }

    var dataset = []

    processed_data['messages_per_day'] = []
    // processed_data['links'] = []

    for (i = 0; i < data_raw.length; i++) {
      chat_name = processed_data['chat_names'][i];
      processed_data['messages_per_day'].push((data_raw[i].total_messages / total_days).toFixed(2));
      processed_data['links'].push((data_raw[i].links / processed_data['total_messages'][i]).toFixed(2));
    }


    dataset.push({
      label: 'Messages per day',
      data: processed_data['messages_per_day'],
      backgroundColor: '#ffd166'
    })

    dataset.push({
      label: 'Links',
      data: processed_data['links'],
      backgroundColor: '#ef476f'
    })



    new Chart(document.getElementById("links_vs_msg_per_day"), {
      type: 'horizontalBar',
      data: {
        labels: processed_data['chat_names'],
        datasets: dataset,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // legend: { display: false },
        title: {
          display: true,
          text: 'Links vs messages per day'
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: true,
            },
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Channels',
            },
            stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              display: false
            }
          }]
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