const adapter = require('../services/adapter')
const storage = require('../reps/storage-funcs')
const mime = require('../libs/mime-types-dictionary')
const path = require('path');

exports.putRequest = async (req, res) => {
    const fileName = req.url.split('/')[2];
    const mimeType = req.headers['content-type'];
    const fileSize = req.headers['content-length'];

    const extension = mime[mimeType];

    const filePath = `D:/nest-projects/real-file-system/upload/${fileName}${extension}`;

    await adapter.saveFile(fileName, mimeType, fileSize);

    const writeStream = storage.writeFile(filePath);
    await req.pipe(writeStream);

    writeStream.on('error', (err) => {
        console.log(err);
    })

    await res.end('hewou');
}

exports.getRequest = async (req, res) => {
    const fileName = await req.url.split('/')[2];

    const filePathAndData = await adapter.getFile(fileName);
        
    await res.setHeader('Content-type', [filePathAndData['mime-type']]);
    await res.setHeader('Content-length', [filePathAndData['file-size']]);

    const readStream = await storage.readFile(filePathAndData['filePath']);

    await readStream.pipe(res);

    readStream.on('end', ()=> {
        res.end();
    })
    
}