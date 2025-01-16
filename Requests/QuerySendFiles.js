const catagories = require("../categories.json");
const fs = require('fs');

module.exports = function QuerySendFiles(ctx, next, port, public) {
    if (ctx, next, port, public) {
        try {
            const { userId, city, id } = ctx.request.body;
            const { file } = ctx.request.files;

            ctx.set('Access-Control-Allow-Origin', '*');
            ctx.set('Content-disposition', `attachment; filename=${file.name}`);
            ctx.set('Content-Type', file.type);
            ctx.set('Content-Length', file.size);

            const tempFilePath = path.join('/tmp', file.originalFilename);

            catagories.forEach(catagory => {
                const typeFiles = file.mimetype.split('/')[0]
                fs.copyFileSync(file.filepath, tempFilePath);

                if (!catagory[typeFiles]) {
                    catagory[typeFiles] = [];
                }

                const doublon = catagory[typeFiles].find(fileEl => (fileEl.size == file.size) && (fileEl.userId == userId));

                if (doublon) {
                    console.error(`This file id - ${id} with user id: ${userId} already in your collection (`);
                    ctx.response.status = 500;
                    ctx.response.body = JSON.stringify({ message: `This file id - ${id} with user id: ${userId} already in your collection (`, status: 'error' });
                } else {

                    const fileInfo = { id, userId, type: file.mimetype, name: file.originalFilename, src: 'http://localhost:' + port + '/' + file.originalFilename, pin: false, city, size: file.size };

                    catagory[typeFiles].unshift(fileInfo);

                    if (!catagory['allMessages']) {
                        catagory['allMessages'] = [];
                    }
                    catagory['allMessages'].unshift(fileInfo);

                    ctx.response.status = 200;
                    console.error(`Success added file with id: ${id} in ${typeFiles};)`);
                    ctx.response.body = JSON.stringify({ file: fileInfo, message: `Success added file with id: ${id} in ${typeFiles};)`, status: 'ok' });
                }
            })
        } catch (error) {
            console.error(`Error send file( ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error send file( ${error.message}`, status: 'error' });
        }
    }
}