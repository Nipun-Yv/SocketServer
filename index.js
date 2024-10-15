import {Server} from "socket.io"
import http1 from "http"
import cors from "cors"
import express from "express"
const port=process.env.PORT||3001
const app1=express();
const server=http1.createServer(app1);
const io=new Server(server,{
    cors:{
        origin:'https://resilient-figolla-f8bd99.netlify.app',
        methods:["GET","POST"]
    }
})
app1.use(cors())
server.listen(port,()=>{
    console.log("Receiving requests from another port");
})
let connectedUsers={}
io.on("connection",(socket)=>{
    console.log("Heyo")
    connectedUsers[socket.id] = { timeouts: [], isSent: false };
    socket.on("send_private_message",(data)=>{
        if(!connectedUsers[socket.id].isSent){
           for(let i=0;i<1000;i++){
               const timeoutId=setTimeout(()=>{io.to(socket.id).emit("receive_message",{obj1:Math.floor(Math.random()*8000+1000),obj2:Math.floor(Math.random()*8000+1000),obj3:Math.floor(Math.random()*8000+1000)}
               )},1100*i);
               connectedUsers[socket.id].timeouts.push(timeoutId);
          }
          connectedUsers[socket.id].isSent=true;
        }
    })
    socket.on("disconnect",()=>{
        connectedUsers[socket.id].timeouts.forEach((timeoutId) => {
            clearTimeout(timeoutId);
          });
          delete connectedUsers[socket.id];
    })
})