var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var gpio = require('rpi-gpio');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('toggle', function(state){
    gpio.setup(7, gpio.DIR_OUT, write(state));
    // console.log(state);
    // console.log(typeof(state));
    // io.emit('state', state);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function write(state) {
  gpio.write(7, state, function(err) {
    if (err) throw err;
    console.log('Written to pin');
  });
}
