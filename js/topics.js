$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV3.csv', function (csvString) {

    // var rows = Papa.parse(csvString, { header: true }).data;

    // var data_raw = rows.map(function (row) {
    //   return {
    //     chat_names: row['Chat  Name'],
    //     total_messages: row['Total  Messages'],
    //     timing_monday: row['Messages  Monday'],
    //     timing_tuesday: row['Messages  Tuesday'],
    //     timing_wednesday: row['Messages  Wednesday'],
    //     timing_thursday: row['Messages  Thursday'],
    //     timing_friday: row['Messages  Friday'],
    //     timing_saturday: row['Messages  Saturday'],
    //     timing_sunday: row['Messages  Sunday']

    //   }
    // })

    // var processed_data = {};
    // processed_data['chat_names'] = [];

    var dataset = []

    // for (i = 0; i < data_raw.length; i++) {
    //   chat_name = data_raw[i].chat_names.slice(0, -4);
    //   processed_data['chat_names'].push(chat_name);
      dataset.push({
        label: 'Local',
        data: [94, 226, 80, 111, 94, 172],
        backgroundColor: '#ffd166'
      })
    // }
    dataset.push({
      label: 'National',
      data: [15, 91, 17, 25, 90, 160],
      backgroundColor: '#ef476f'
    })

    // var labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var labels = ['Public service', 'Health', 'Disaster', 'Crime', 'Economy', 'Politics']

    new Chart(document.getElementById("topics"), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: dataset,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: true },
        title: {
          display: false,
          text: '% Messages per weekday'
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
          }],
          yAxes: [{
            stacked: true,
            // ticks: {
            //   callback: function (label, index, labels) {
            //     return label + '%';
            //   }
            // }
          }]
        },
        // tooltips: {
        //   displayColors: false,
        //   callbacks: {
        //     label: function (t, d) {
        //       var dstLabel = d.datasets[t.datasetIndex].label;
        //       var yLabel = t.yLabel;
        //       return dstLabel + ': ' + yLabel + ' %';
        //     },
        //   }
        // },
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