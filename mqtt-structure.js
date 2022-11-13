// Called after form input is processed
var led_is_on    = null;
var topic="IOT2000/on";
var topic1="IOT2000/factory/#";
var topic2="factory/reset";
var curDate = new Date();
// Ngày hiện tại
var curDay = curDate.getDate();
// Tháng hiện tại
var curMonth = curDate.getMonth() + 1;
// Năm hiện tại
var curYear = curDate.getFullYear();
// Gán vào thẻ HTML
document.getElementById("current-time").innerHTML = "Ngày"+" "+curDay+" "+"Tháng"+" "+curMonth+" " +"Năm" +" "+ curYear;
function startConnect() {
    // Tạo ngẫu nhiên ID của Client
    clientID = "clientID-" + parseInt(Math.random() * 100);
    // Tìm nạp các thông tin từ form HTML 
    host = document.getElementById("host").value;
    port = document.getElementById("port").value;
    //user = document.getElementById("username").value;
    //pass = document.getElementById("password").value;


    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Connecting to: ' + host + ' on port: ' + port + '</span><br/>';
    document.getElementById("messages").innerHTML += '<span>Using the following client value: ' + clientID + '</span><br/>';

    // Khởi tạo kết nối ứng dụng Client với Paho MQTT
    client = new Paho.MQTT.Client(host, Number(port), clientID);
    // Đặt trình xử lí Callback
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect the client, if successful, call onConnect function
    client.connect({ 
        onSuccess: onConnect,
        //userName: user,
        //password: pass,
    });
}

// Called when the client connects
function onConnect() {
    // Fetch the MQTT topic from the form

    // Print output for the user in the messages div
    document.getElementById("messages").innerHTML += '<span>Subscribing to: ' + topic1 + '</span><br/>';
    // Subscribe to the requested topic
    client.subscribe(topic1);
}

// Called when the client loses its connection
function onConnectionLost(responseObject) {
    document.getElementById("messages").innerHTML += '<span>ERROR: Connection lost</span><br/>';
    if (responseObject.errorCode !== 0) {
        document.getElementById("messages").innerHTML += '<span>ERROR: ' + + responseObject.errorMessage + '</span><br/>';
    }
}

// Called when a message arrives
function onMessageArrived(r_message) {
    console.log("onMessageArrived: " + r_message.payloadString);
    topic1=r_message.destinationName;
    if (topic1=="IOT2000/factory/count")
    {
        document.getElementById("count").innerHTML=r_message.payloadString;
    }
    if (topic1=="IOT2000/factory/count1")
    {
        document.getElementById("count1").innerHTML=r_message.payloadString;
    }
    if (topic1=="IOT2000/factory/count2")
    {
        document.getElementById("count2").innerHTML=r_message.payloadString;
    }
    if (topic1=="IOT2000/factory/count3")
    {
        document.getElementById("count3").innerHTML=r_message.payloadString;
    }
    if (topic1=="IOT2000/factory/count4")
    {
        document.getElementById("count4").innerHTML=r_message.payloadString;
    }
}

// Called when the disconnection button is pressed
function startDisconnect() {
    client.disconnect();
    document.getElementById("messages").innerHTML += '<span>Disconnected</span><br/>';
    updateScroll();
}
// Updates #messages div to auto-scroll
function updateScroll() {
    var element = document.getElementById("messages");
    element.scrollTop = element.scrollHeight;
}
function start(){
    payload="true";
    // Send messgae
	message = new Paho.MQTT.Message(payload);
	message.destinationName = topic;
	client.send(message);
}
function stop(){
    payload="false";
    message=new Paho.MQTT.Message(payload);
    message.destinationName=topic;
    client.send(message);
}
function reset(){
    payload2="true";
    // Send messgae
	message2 = new Paho.MQTT.Message(payload2);
	message2.destinationName = topic2;
	client.send(message2);
}
