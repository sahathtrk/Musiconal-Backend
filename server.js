const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3001;
const server = http.createServer({}, app)
server.listen(PORT, (err) => {
    if (err) {
        throw new Error(err)
    }
    console.log("Start listen server in port " + PORT)
})

