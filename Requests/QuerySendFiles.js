const fs = require('fs');
const catagories = require("../categories.json");
const request = require("request");

module.exports = function QuerySendFiles(ctx, next, port, public) {
    try {
        const { userId, city, id } = ctx.request.body;
        const { file } = ctx.request.files;

        ctx.set('Access-Control-Allow-Origin', '*');
        ctx.set('Content-disposition', `attachment; filename=${file.name}`);
        ctx.set('Content-Type', file.type);
        ctx.set('Content-Length', file.size);

        const fileStream = fs.createReadStream(file.filepath);

        const uploadPath = `https://ahj-diploma-backend-b94r.onrender.com/${file.originalFilename}`;
        fileStream.pipe(request.put(uploadPath))
            .on('response', function(response) {
                if (response.statusCode === 200) {
                    console.log(`File uploaded successfully to ${uploadPath}`);
                } else {
                    console.error(`Failed to upload file: ${response.statusCode}`);
                }
            });

        catagories.forEach(catagory => {
            const typeFiles = file.mimetype.split('/')[0];

            if (catagory[typeFiles] && catagory[typeFiles].find(fileEl => (fileEl.size == file.size) && (fileEl.userId == userId))) {
                console.error(`This file id - ${id} with user id: ${userId} already in your collection (`);
                ctx.response.status = 500;
                ctx.response.body = JSON.stringify({ message: `This file id - ${id} with user id: ${userId} already in your collection (`, status: 'error' });
                return;
            }

            const fileInfo = { id, userId, type: file.mimetype, name: file.originalFilename, src: uploadPath, pin: false, city, size: file.size };

            if (!catagory[typeFiles]) {
                catagory[typeFiles] = [];
            }
            catagory[typeFiles].unshift(fileInfo);

            if (!catagory['allMessages']) {
                catagory['allMessages'] = [];
            }
            catagory['allMessages'].unshift(fileInfo);

            ctx.response.status = 200;
            console.error(`Success added file with id: ${id} in ${typeFiles};)`);
            ctx.response.body = JSON.stringify({ file: fileInfo, message: `Success added file with id: ${id} in ${typeFiles};)`, status: 'ok' });
        });
    } catch (error) {
        console.error(`Error sending file: ${error.message}`);
        ctx.response.status = 500;
        ctx.response.body = JSON.stringify({ message: `Error sending file: ${error.message}`, status: 'error' });
    }
}