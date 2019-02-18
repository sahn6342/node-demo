// path module

// const path=require('path');
// const parsedPath=path.parse(__filename);
// console.log(parsedPath);


// os module

// const os=require('os');
// var totalMemory=os.totalmem();
// var freeMemory=os.freemem();
// console.log(totalMemory,freeMemory);
// console.log(`Total memory: ${totalMemory}, Free Memory: ${freeMemory}`)

// file system module

// const fs=require('fs');
// const files=fs.readdirSync('./');
// console.log(files);
// fs.readdir('./',function(err,files){
//     if(err){
//         console.log(`Error ${err}`);
//     }else{
//         console.log(`Result`,files);
//     }

// })
 
// events module

// const EventEmitter = require('events');
// const emitter=new EventEmitter();

// emitter.on('firstEvent',function(){
//     console.log('event emitted');
// })

// emitter.emit('firstEvent');

// http module

const http=require('http');
const server =http.createServer((req,res)=>{
    if(req.url==='/'){
        res.write('Hello World');
        res.end();
    }
    if(req.url==='/sahn'){
        res.write(JSON.stringify([1,2,3,4]));
        res.end();
    }
});
server.on('connection',(socket)=>{
    console.log('New connection...')
})
server.listen(3000);
console.log('Listening on portt 3000');