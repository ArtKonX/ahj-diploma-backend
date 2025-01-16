const catagories = require("../categories.json");

module.exports = function QueryAddPin(ctx, next) {
    if (ctx, next) {
        try {

            const { id, userId } = ctx.request.body;

            catagories.forEach(catagory => {
              if (!catagory['allMessages']) {
                catagory['allMessages'] = [];
              }

              const messagesUser = catagory['allMessages'].filter(message => message.userId == userId);

              messagesUser.map(message => {
                if (message.id === id) {
                  message.pin = true
                } else {
                  message.pin = false
                }
              });

              const pin = messagesUser.find(message => message.pin === true);

              if (pin) {

                console.error(`Success added pin with id: ${id} ;)`);
                ctx.response.status = 200;
                ctx.response.body = JSON.stringify({ pin, message: `Success added pin with id: ${id} ;)`, status: 'ok' });
              } else {
                console.error(`Error removal pin with id: ${id} (`);
                ctx.response.status = 500;
                ctx.response.body = JSON.stringify({ pin: [], message: `Error added pin with id: ${id} (`, status: 'error' });
              }
            })
          } catch (error) {
            console.error(`Error added pin: ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error added pin: ${error.message}`, status: 'error' });
          }
    }
}