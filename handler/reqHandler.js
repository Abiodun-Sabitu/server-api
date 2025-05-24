const { loadHomePage, loadErrorPage } = require("../utils")


const reqHandler = async  (req, res)=>{
    try {
        if(req.url === '/index.html' && req.method === 'GET'){
           res.writeHead(200, {'Content-Type':"text/html"})
           res.end(await loadHomePage())
        }else{
            res.writeHead(404, {'Content-Type':"text/html"})
            res.end(await loadErrorPage())
        }
    } catch (error) {
        res.writeHead(500, {'Content-Type':"text/plain"})
        res.end(error.message)
    }
     
}


module.exports = reqHandler;