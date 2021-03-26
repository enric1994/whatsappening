$(document).ready(function () {

  var chat_names = {}
  chat_names['Aos Fatos'] = 'blue'
  chat_names['Correio Sabiá'] = 'red'
  chat_names['Gazeta do Povo Local'] = 'grey'
  chat_names['Gazeta do Povo'] = 'black'
  chat_names['GZH Coronavirus'] = 'green'
  chat_names['GaúchaZH'] = 'pink'
  chat_names['Jornal do Comércio'] = 'orange'
  chat_names['Matinal'] = 'yellow'
  chat_names['O Estado de S. Paulo'] = 'purple'
  chat_names['O Mirante Joinville'] = 'coral'
  chat_names['O Município Joinville'] = 'cyan'
  chat_names['O Município'] = 'lime'
  chat_names['Pública'] = 'olive'
  chat_names['Seu Panorama'] = 'skyblue'
  chat_names['The Intercept Brasil'] = 'tomato'
  chat_names['Tribuna do Paraná'] = 'silver'
  chat_names['UOL Economia+'] = 'peru'
  chat_names['UOL Tilt'] = 'brown'
  

  // Read data file and create a chart
  $.get('./stats.csv', function (csvString) {

    var rows = Papa.parse(csvString, { header: true }).data;
    
    var data_raw = rows.map(function (row) {
      return {
        chat_names: row['Chat  Name'],
        total_messages: row['Total  Messages']
      }
    })
    var processed_data = {};
    processed_data['chat_names']=[];
    processed_data['total_messages']=[];
    for (i=0;i<data_raw.length;i++){
      // processed_data['chat_names']=[];
      processed_data['chat_names'].push(data_raw[i].chat_names.slice(0,-4));
      processed_data['total_messages'].push(data_raw[i].total_messages);
    }
    // console.log(processed_data)
    // console.log(data);
    // var StatsData = {
    //   datasets: [{
    //     label: processed_data['chat_names'],
    //     data: processed_data['total_messages'],
    //     // pointRadius: POINT_RADIUS,
    //     // pointHoverRadius: POINT_RADIUS + 2,
    //     pointBackgroundColor: function (context) {
    //       var index = context.dataIndex;
    //       var value = context.dataset.data[index].chat;
    //       return chat_names[value];
    //   }]
    // };

    // var ctx = document.getElementById('total_messages').getContext('2d');

    new Chart(document.getElementById("total_messages"), {
      type: 'horizontalBar',
      data: {
        labels: processed_data['chat_names'],
        datasets: [{
            label: processed_data['chat_names'],
      //       borderColor: barStroke,
			// borderWidth: 1,
      //       fill: true,
      //       backgroundColor: barFill,
			// hoverBackgroundColor: barFillHover,
            data: processed_data['total_messages'],
            backgroundColor: function (context) {
              var index = context.dataIndex;
              console.log(context.dataset)
              var value = context.dataset.label[index];
              return chat_names[value];
          },
        }]
    },
      options: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Total messages'
        }
      }
    });

  });
});