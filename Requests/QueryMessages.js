const catagories = require("../categories.json");

module.exports = function QueryMessages(ctx, next) {
    if (ctx, next) {
        try {
            const { count } = ctx.request.params;

            const page = parseInt(ctx.request.query.page) || 1;
            const size = parseInt(ctx.request.query.size) || 10;

            const catagoryName = ctx.request.query.catagorie;

            const userId = ctx.request.query.userId

            const startIndex = (page - 1) * size + Number(count);
            const endIndex = startIndex + size;

            catagories.forEach(category => {

              if (category[catagoryName]) {

                const userCurrentFiles = category[catagoryName].filter(message => userId == message.userId);
                const receivedFiles = userCurrentFiles.slice(startIndex, endIndex);

                ctx.response.status = 200;
                ctx.response.body = JSON.stringify({ messages: receivedFiles, message: `Success getting messages category with user id: ${userId};)`, status: 'ok' });
              } else {
                ctx.response.status = 200;
                ctx.response.body = JSON.stringify({ messages: [], message: `Error getting messages category with user id: ${userId};)`, status: 'error' });
              }
            })
          } catch (error) {
            console.error(`Error getting messages: ${error.message}`); 
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error getting messages: ${error.message}`, status: 'error' });
          }
    }
}