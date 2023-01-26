const controller = require('../controllers/file-storage')

exports.router = (req,res) => {
    if (req.url.startsWith('/files/')){
        if (req.method === 'GET')
        {
            controller.getRequest(req,res);
        }
        else if (req.method === 'PUT')
        {
            controller.putRequest(req,res);
        }
    }
    else {
        res.end('hit');
    }
}
