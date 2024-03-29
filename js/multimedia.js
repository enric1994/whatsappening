$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV3.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Total  Messages'],
        average_characters: row['Average  Characters  Length'],
        video: row['Total  videos'],
        image: row['Total  images'],
        audio: row['Total  audios'],
        links: row['Total  links']
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
    
    processed_data['video'] = []
    processed_data['image'] = []
    processed_data['audio'] = []
    processed_data['links'] = []

    for (i = 0; i < data_raw.length; i++) {
      chat_name = processed_data['chat_names'][i];
      processed_data['video'].push((100 * data_raw[i].video / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(4));
      processed_data['image'].push((100 * data_raw[i].image / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(4));
      processed_data['audio'].push((100 * data_raw[i].audio / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(4));
      processed_data['links'].push((100 * data_raw[i].links / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(4));
    }

      // dataset.push({
      //   label: 'Links',
      //   data: processed_data['links'],
      //   backgroundColor: '#ef476f'
      // })

      dataset.push({
        label: 'Videos',
        data: processed_data['video'],
        backgroundColor: '#ffd166'
      })

      dataset.push({
        label: 'Images',
        data: processed_data['image'],
        backgroundColor: '#06d6a0'
      })
    
      dataset.push({
        label: 'Audios',
        data: processed_data['audio'],
        backgroundColor: '#118ab2'
      })
    
    new Chart(document.getElementById("multimedia"), {
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
          display: false,
          text: 'Videos, images and audios per 100 characters'
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