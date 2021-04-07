$(document).ready(function () {

  // Read data file and create a chart
  $.get('./stats.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;

    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Total  Messages'],
        timing_hour_0: row['Messages  at  0  hours'],
        timing_hour_1: row['Messages  at  1  hours'],
        timing_hour_2: row['Messages  at  2  hours'],
        timing_hour_3: row['Messages  at  3  hours'],
        timing_hour_4: row['Messages  at  4  hours'],
        timing_hour_5: row['Messages  at  5  hours'],
        timing_hour_6: row['Messages  at  6  hours'],
        timing_hour_7: row['Messages  at  7  hours'],
        timing_hour_8: row['Messages  at  8  hours'],
        timing_hour_9: row['Messages  at  9  hours'],
        timing_hour_10: row['Messages  at  10  hours'],
        timing_hour_11: row['Messages  at  11  hours'],
        timing_hour_12: row['Messages  at  12  hours'],
        timing_hour_13: row['Messages  at  13  hours'],
        timing_hour_14: row['Messages  at  14  hours'],
        timing_hour_15: row['Messages  at  15  hours'],
        timing_hour_16: row['Messages  at  16  hours'],
        timing_hour_17: row['Messages  at  17  hours'],
        timing_hour_18: row['Messages  at  18  hours'],
        timing_hour_19: row['Messages  at  19  hours'],
        timing_hour_20: row['Messages  at  20  hours'],
        timing_hour_21: row['Messages  at  21  hours'],
        timing_hour_22: row['Messages  at  22  hours'],
        timing_hour_23: row['Messages  at  23  hours'],
      }
    })

    var processed_data = {};
    processed_data['chat_names'] = [];
    processed_data['timing_hour'] = [];

    var dataset = []

    for (i = 0; i < data_raw.length; i++) {
      chat_name = data_raw[i].chat_names.slice(0, -4);
      processed_data['chat_names'].push(chat_name);
      dataset.push({
        label: chat_name,
        data: [data_raw[i].timing_hour_0 / data_raw[i].total_messages,
        (data_raw[i].timing_hour_1 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_2 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_3 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_4 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_5 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_6 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_7 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_8 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_9 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_10 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_11 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_12 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_13 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_14 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_15 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_16 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_17 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_18 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_19 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_20 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_21 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_22 / data_raw[i].total_messages).toFixed(2) * 100,
        (data_raw[i].timing_hour_23 / data_raw[i].total_messages).toFixed(2) * 100] ,
        backgroundColor: chat_names[chat_name]
      })
    }

    var labels = [];
    for (i = 0; i <= 23; i++) { 
      labels.push(i + 'h');
    }


    new Chart(document.getElementById("timing_hour"), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataset,
      },
      options: {
        responsive: true,
        legend: { display: false },
        title: {
          display: true,
          text: '% Messages per hour'
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
        tooltips: {
          displayColors: false,
          callbacks: {
            label: function (t, d) {
              var dstLabel = d.datasets[t.datasetIndex].label;
              var yLabel = t.yLabel;
              return dstLabel + ': ' + yLabel + ' %';
            }
          }
        }
      }
    });

  });
});