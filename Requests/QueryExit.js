const users = require("../users.json");

module.exports = function QueryExit(ctx, next) {
    if (ctx, next) {
        try {
            const { id } = ctx.request.body;

            const userIndex = users.findIndex(user => user.id === id);

            if (users[userIndex].status == 'online') {
              console.error(`Success exit user;)`);
              users[userIndex].status = 'offline';
              ctx.response.status = 200;
              ctx.response.body = JSON.stringify({ user: users[userIndex], message: `Success exit user: ${users[userIndex].id};)`, status: 'ok' });
            } else {
              console.error(`This user is already exit( id: ${users[userIndex].id}`);
              ctx.response.status = 500;
              ctx.response.body = JSON.stringify({ message: `This user id: ${users[userIndex].id} is already exit( Log in first of your account!`, status: 'error' });
            }
          } catch (error) {
            console.error(`Error exit user: ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error exit user id: ${users[userIndex].id} - ${error.message}`, status: 'error' });
          }
    }
}