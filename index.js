import {Server} from "socket.io"
import http1 from "http"
import cors from "cors"
import express from "express"
const port=process.env.PORT||3001
const app1=express();
const server=http1.createServer(app1);
const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
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
    connectedUsers[socket.id]=0;
    socket.on("send_private_message",(data)=>{
        if(connectedUsers[socket.id]===0){
           for(let i=0;i<1000;i++){
               setTimeout(()=>{io.to(socket.id).emit("receive_message",{obj1:Math.floor(Math.random()*8000+1000),obj2:Math.floor(Math.random()*8000+1000),obj3:Math.floor(Math.random()*8000+1000)}
               )},1100*i);
               connectedUsers[socket.id]=1;
          }}
    })
})