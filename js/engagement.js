$(document).ready(function () {

  // Read data file and create a chart
  $.get('./statsV3.csv', function (csvString) {

    new Chart(document.getElementById("engagement"), {
      type: 'doughnut',
      data: {
        labels: ['Feedback', 'Survey', 'Questions', 'Contact', 'Crowdsourcing', 'Share', 'Promotion'],
        // labels: ['Crowdsourcing', 'Questions', 'Feedback', 'Promotion', 'Survey', 'Contact', 'Share'],
        datasets: [{
          // label: 'Total messages',
          data: [1.1, 1.1, 5.7, 6.8, 11.9, 36.4, 36.9],
          // data: [11.9, 5.7, 1.1, 36.9, 1.1, 6.8, 36.4],
          backgroundColor: ['#EF476F', '#f78c6b', '#ffd166', '#83d483', '#06d6a0', '#118ab2', '#0c637f']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        title: {
          display: true,
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
            label: function (t, d) {
              return d.labels[t.index] + ': ' + d.datasets[t.datasetIndex].data[t.index] + ' %';
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