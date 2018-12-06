// Create a client instance
client = new Paho.MQTT.Client("m15.cloudmqtt.com", 31444, "myweb");
//Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
var options = {
  useSSL: true,
  userName: "bemhpayn",
  password: "poJDfPBfkw9Y",
  onSuccess: onConnect,
  onFailure: doFail
}

// connect the client
client.connect(options);

// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");

  client.subscribe("/server");
  client.subscribe("smartfarm/temperature");
  client.subscribe("smartfarm/humidity");
  client.subscribe("smartfarm/humidity_soid");
  client.subscribe("smartfarm/measure_water");

  message = new Paho.MQTT.Message("off");
  message.destinationName = "/server";
  client.send(message);

  swal("Connect OK", "MQTT Connection !", "success");
  
}

function doFail(e) {
  console.log(e);
  alert('Fail Connect MQTT');
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:" + responseObject.errorMessage);
  }
}


//setting array
var result = [];

// called when a message arrives
function onMessageArrived(message) {
  console.log("onMessageArrived:" + message.destinationName + ' ' + message.payloadString);

  if (message.destinationName == "smartfarm/measure_water") {
    var water = JSON.parse(message.payloadString);
    measure_water(water);
  }


  if (message.destinationName == "smartfarm/temperature") {
    var Temp = JSON.parse(message.payloadString);
    updateDonutChart('#specificChart', Temp, true);
    result.push(Temp);
  }

  if (message.destinationName == "smartfarm/humidity_soid") {
    var Humidity_soid = JSON.parse(message.payloadString);
    updateDonutChart('#specificChart3', Humidity_soid, true);
    result.push(Humidity_soid);
  }

  if (message.destinationName == "smartfarm/humidity") {
    var Humidity = JSON.parse(message.payloadString);
    updateDonutChart('#specificChart2', Humidity, true);
    result.push(Humidity);

    //Canvas
    var options = {
      animationEnabled: true,
      title: {
        text: "Monitor Graph"
      },
      data: [{
        type: "doughnut",
        innerRadius: "40%",
        showInLegend: true,
        legendText: "{label}",
        indexLabel: "{label}: #percent%",
        dataPoints: [
          
          { label: "HumiditySoid", y: result[1] },
          { label: "Temperature", y: result[2] },
          { label: "Humidity", y: result[3] }
        ]
      }]
    };

  $("#chartContainer").CanvasJSChart(options);
  console.log(result);
  result = [];
  console.log(result);

  }
  
}


function led_on() {
  send("on");
  $('#light-bulb2').css({ 'opacity': '1' });
  $("#status-pump-off").css({ 'background-color': '#7eda99' })
  
}

function led_off() {
  send("off");
  $('#light-bulb2').css({ 'opacity': '0' });
  $("#status-pump-off").css({ 'background-color': '#fe6847' })
  
}

function send(msg) {
  message = new Paho.MQTT.Message(msg);
  message.destinationName = "/server";
  client.send(message);
}


/**
 * Updates the donut chart's percent number and the CSS positioning of the progress bar.
 * Also allows you to set if it is a donut or pie chart
 * @param  {string}  el      The selector for the donut to update. '#thing'
 * @param  {number}  percent Passing in 22.3 will make the chart show 22%
 * @param  {boolean} donut   True shows donut, false shows pie
 */
function updateDonutChart(el, percent, donut) {
  percent = Math.round(percent);
  if (percent > 100) {
    percent = 100;
  } else if (percent < 0) {
    percent = 0;
  }
  var deg = Math.round(360 * (percent / 100));

  if (percent > 50) {
    $(el + ' .pie').css('clip', 'rect(auto, auto, auto, auto)');
    $(el + ' .right-side').css('transform', 'rotate(180deg)');
  } else {
    $(el + ' .pie').css('clip', 'rect(0, 1em, 1em, 0.5em)');
    $(el + ' .right-side').css('transform', 'rotate(0deg)');
  }
  if (donut) {
    $(el + ' .right-side').css('border-width', '0.1em');
    $(el + ' .left-side').css('border-width', '0.1em');
    $(el + ' .shadow').css('border-width', '0.1em');
  } else {
    $(el + ' .right-side').css('border-width', '0.5em');
    $(el + ' .left-side').css('border-width', '0.5em');
    $(el + ' .shadow').css('border-width', '0.5em');
  }
  $(el + ' .num').text(percent);
  $(el + ' .left-side').css('transform', 'rotate(' + deg + 'deg)');
}






