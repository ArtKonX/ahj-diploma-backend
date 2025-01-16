const catagories = require("../categories.json");

module.exports = function QueryGetPin(ctx, next) {
    if (ctx, next) {
        try {

            const userId = ctx.request.query.userId;

            catagories.forEach(catagory => {
              if (!catagory['allMessages']) {
                catagory['allMessages'] = [];
              }

              const pin = catagory['allMessages'].filter(message => message.userId === userId).find(mess => mess.pin === true);

              if (pin) {

                console.error(`Success getting pin user id: ${userId} ;)`);
                ctx.response.status = 200;
                ctx.response.body = JSON.stringify({ pin, message: `Success getting pin with id: ${pin.id} ;)`, status: 'ok' });
              } else {
                console.error(`Error getting pin(`);
                ctx.response.status = 500;
                ctx.response.body = JSON.stringify({ pin: [], message: `Error getting pin(`, status: 'error' });
              }
            })
          } catch (error) {
            console.error(`Error geting pin: ${error.message}`); // Логирование ошибки
            ctx.response.status = 500; // Установлено состояние 500
            ctx.response.body = JSON.stringify({ message: `Error getting pin( ${error.message}`, status: 'error' });
          }
    }
}