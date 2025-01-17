const catagories = require("../categories.json");
const fs = require('fs');
const path = require('path');

module.exports = function QueryDownloadFile(ctx, next, port, public) {
    if (ctx, next, port, public) {
        try {

            const { id } = ctx.params;
            const userId = ctx.request.query.userId

            catagories.forEach(el => {
              if (!el['allMessages']) {
                el['allMessages'] = [];
              }

              const file = el['allMessages'].filter(message => message.userId == userId).find(f => f.id == id);

              if (!file) {

                console.error(`The file with the ID ${id} was not found or does not have a file path.`);
                ctx.response.status = 500;
                ctx.response.body = JSON.stringify({ message: `The file with the ID ${id} was not found or does not have a file path.`, status: 'error' })
              } else {

                ctx.set('Access-Control-Allow-Origin', '*');
                ctx.set('Content-disposition', `attachment; filename=${file.name}`);
                ctx.set('Content-Type', file.type);
                ctx.set('Content-Length', file.size);

                let filePath = path.join(public, file.src.replace('http://localhost:7070', ''));

                const stream = fs.createReadStream(filePath);

                console.error(`Successful file download with id: ${id};)`);
                ctx.response.status = 200;
                ctx.response.body = stream;
              }
            })

          } catch (error) {
            console.error(`Error file download( ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error file download( ${error.message}`, status: 'error' });
          }
    }
}