const http = require('http');
const http_api = require('./routers/http-api')
const port = 3000;

http.createServer(http_api.router).listen(port);


