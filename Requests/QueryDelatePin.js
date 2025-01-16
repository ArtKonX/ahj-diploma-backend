const catagories = require("../categories.json");

module.exports = function QueryDelatePin(ctx, next) {
    if (ctx, next) {
        try {

            const { id, userId } = ctx.request.body;

            catagories.forEach(catagory => {

              const messagesUser = catagory['allMessages'].filter(message => message.userId == userId);
              const delPin = messagesUser.find(mess => (mess.id === id) && (mess.pin === true));
              const indxDel = catagory['allMessages'].findIndex(mess => mess.id == delPin.id);

              if (indxDel !== -1) {

                catagory['allMessages'][indxDel].pin = false;

                console.error(`Success removal pin with id: ${id} ;)`);
                ctx.response.status = 200;
                ctx.response.body = JSON.stringify({ pin: catagory['allMessages'][indxDel], message: `Success removal pin with id: ${id} ;)`, status: 'ok' });
              } else {
                console.error(`Error removal pin with id: ${id} (`);
                ctx.response.status = 500;
                ctx.response.body = JSON.stringify({ pin: [], message: `Error removal pin with id: ${id} (`, status: 'error' });
              }
            })
          } catch (error) {
            console.error(`Error removal pin: ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error removal pin: ${error.message}`, status: 'error' });
          }
    }
}