var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gpio = require('pi-gpio');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('toggle', function(state){
    gpio.open(7, "output", function(err) {   // Open pin 7 for output
        gpio.write(7, 1, function() {      // Set pin 7 high (1)
            gpio.close(7);           // Close pin 7
        });
    });
    // console.log(state);
    // console.log(typeof(state));
    // io.emit('state', state);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
