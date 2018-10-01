 // Create a client instance
 client = new Paho.MQTT.Client("m15.cloudmqtt.com", 31444,"myweb"); 
 //Example client = new Paho.MQTT.Client("m11.cloudmqtt.com", 32903, "web_" + parseInt(Math.random() * 100, 10));

 // set callback handlers
 client.onConnectionLost = onConnectionLost;
 client.onMessageArrived = onMessageArrived;
 var options = {
   useSSL: true,
   userName: "bemhpayn",
   password: "poJDfPBfkw9Y",
   onSuccess:onConnect,
   onFailure:doFail
 }

 // connect the client
 client.connect(options);

 // called when the client connects
 function onConnect() {
   // Once a connection has been made, make a subscription and send a message.
   console.log("onConnect");
   client.subscribe("/server");
   message = new Paho.MQTT.Message("off");
   message.destinationName = "/server";
   client.send(message); 
   swal("Connect OK","MQTT Connection !","success");
 }

 function doFail(e){
   console.log(e);
   swal("Error","MQTT Failed !","error");
 }

 // called when the client loses its connection
 function onConnectionLost(responseObject) {
   if (responseObject.errorCode !== 0) {
     console.log("onConnectionLost:"+responseObject.errorMessage);
   }
 }

 // called when a message arrives
 function onMessageArrived(message) {
   console.log("onMessageArrived:"+message.payloadString);
 }
 function led_on(){
   send("on");
   $('#light-bulb2').css({'opacity': '1'});
 }
 function led_off(){
   send("off");
   $('#light-bulb2').css({'opacity': '0'});
 }
 function send(msg){
   message = new Paho.MQTT.Message(msg);
   message.destinationName = "/server";
   client.send(message); 
 }

 