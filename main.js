const http = require('http');
const httpApi = require('./routers/http-api')
const PORT = process.env.PORT;

http.createServer(httpApi.router).listen(PORT||3000);


