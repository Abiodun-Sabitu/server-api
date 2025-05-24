const http = require("http");
const reqHandler = require('./handler/reqHandler')
const PORT = 8000;
const HOSTNAME = "http://localhost";


const server = http.createServer(reqHandler);

server.listen(PORT, ()=>{
    console.log(`server is running on ${HOSTNAME}:${PORT}`)
});
