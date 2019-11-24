
$(document).ready(()=>{

    var socket = io.connect("http://localhost:8000");


    $("#btnload").click(()=>{
        socket.emit('transmitImage',()=>{
    
        })
    });

var chunks = [];
socket.on('chunk-data',(chunk)=>{
    chunks.push(chunk);
    //var img = document.getElementById('img1');
    //img.src = null;
    //img.setAttribute('src','data:image/jpg;base64,'+ window.btoa(chunks));  

});

socket.on('ImageFinished',(chunksdata)=>{
   // chunks.push(chunk);
    var img = document.getElementById('img1');
    img.src = null;
    img.setAttribute('src','data:image/jpg;base64,'+ window.btoa(chunksdata));  

});




} );







