
var express = require('express'),
app = express(),
http = require('http'),
socketIo = require('socket.io'),
fs = require('fs'),
path = require('path'),
server,io;

app.get('/',(req,res)=>{

    res.sendFile(__dirname + '/index.html');

});

app.use(express.static('public'));

server = http.Server(app);
server.listen(8000);

io = socketIo(server);

io.on('connection', (socket)=>{

    console.log('connection is established!');

    socket.on('transmitImage',()=>{

        var imgpath = path.resolve(__dirname,'./bmw-cars-picture.jpg');
            console.log(imgpath);
            var readStream = fs.createReadStream(imgpath,{
                encoding : 'binary'
                });

            var chunks = [], delay = 5000;

            console.log(readStream);

            readStream.on('data',(chunk)=>{
                console.log('Image is transmittiing!');
                chunks.push(chunk);
                setTimeout(() => {
                    socket.emit('chunk-data', chunk );    
                }, 0);
            });
        
            readStream.on('end',()=>{
                console.log('Image is sent to client.')
                socket.emit('ImageFinished', chunks );    
            })
        

    });
    
    // readStream.on('readable',()=>{
    //     console.log('Image is started to transfer.');

    // });


});

