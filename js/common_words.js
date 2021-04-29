$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV3.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Total  Messages'],
        average_characters: row['Average  Characters  Length'],
        trump: row['trump'],
        biden: row['biden'],
        covid: row['covid'],
        coronavirus: row['coronavirus'],
        bolsonaro: row['bolsonaro'],
        lula: row['lula']
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
    
    processed_data['trump'] = []
    processed_data['biden'] = []
    processed_data['covid'] = []
    // processed_data['coronavirus'] = []
    processed_data['bolsonaro'] = []
    processed_data['lula'] = []

    for (i = 0; i < data_raw.length; i++) {
      chat_name = processed_data['chat_names'][i];
      processed_data['covid'].push((100 * (data_raw[i].covid + data_raw[i].coronavirus) / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(2));
      processed_data['trump'].push((100 * data_raw[i].trump / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(2));
      processed_data['biden'].push((100 * data_raw[i].biden / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(2));
      processed_data['bolsonaro'].push((100 * data_raw[i].bolsonaro / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(2));
      processed_data['lula'].push((100 * data_raw[i].lula / (processed_data['average_characters'][i] * processed_data['total_messages'][i])).toFixed(2));

    }
      dataset.push({
        label: 'Covid-19',
        data: processed_data['covid'],
        backgroundColor: '#ef476f'
      })

      dataset.push({
        label: 'Donald Trump',
        data: processed_data['trump'],
        backgroundColor: '#ffd166'
      })
    
      dataset.push({
        label: 'Joe Biden',
        data: processed_data['biden'],
        backgroundColor: '#06d6a0'
      })

      dataset.push({
        label: 'Jair Bolsonaro',
        data: processed_data['bolsonaro'],
        backgroundColor: '#118ab2'
      })

      dataset.push({
        label: 'Lula da Silva',
        data: processed_data['lula'],
        backgroundColor: '#073b4c'
      })
    
    new Chart(document.getElementById("common_words"), {
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
          text: 'Words analysis per 100 characters'
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