// Created by nodejsorg 

const settings = {
    "ip": "127.0.0.1",
    "port": "80"
}

const http = require(`http`)
const fs = require(`fs`)


const server = http.createServer(function(req, res) {
    if(!req.url) {
        res.end(`nic`)
    }
    const ua = req.headers[`user-agent`]
    if(!ua.includes("Java")) {
        res.end(`Not for dog sausage`)
        return
    }

    if(fs.existsSync(`.${req.url}`)) {
    
        if(req.url.includes(`/items/`)) {
            if(req.url.endsWith(`/`)) return
            const data = fs.readFileSync(`.${req.url}`)
            if(req.url.endsWith(`.png`)) {
                res.writeHead(200, {'Content-Type': 'image/png' })
                res.end(data)
            }

            if(req.url.endsWith(`.cfg`)) {
                res.writeHead(200, {'Content-Type': 'text/plain' })
                res.end(data)
            }
            return
        }
        if(req.url.endsWith(`.png`)) {
            res.writeHead(200, {'Content-Type': 'image/png' })
            const data = fs.readFileSync(`.${req.url}`)
            res.end(data)
        }
        return
    } else {
        res.writeHead(302, {
            'Location': `http://107.182.233.85${req.url}`
            //add other headers here...
          });
          res.end();
          return
    }
    res.end()
})
server.listen(settings.port, settings.ip, () => {
    console.log(`Listening on port ${settings.port}`)
} )