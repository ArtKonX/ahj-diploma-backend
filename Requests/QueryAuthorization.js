const users = require("../users.json");

module.exports = function QueryAuthorization(ctx, next) {
    if (ctx, next) {
        try {
            const createData = ctx.request.body;

            const userInfo = {
              email: createData.email,
              password: createData.password,
            };

            const userIndex = users.findIndex(user => (user.email === userInfo.email) && (user.password === userInfo.password));

            if (userIndex == -1) {
              console.error(`There is no such user()`);
              ctx.response.status = 500;
              ctx.response.body = JSON.stringify({ message: `There is no such user()`, status: 'error' });
            } else if (users[userIndex].status == 'offline') {
              console.error(`Success authorization user;)`);
              users[userIndex].status = 'online';
              ctx.response.status = 200;
              ctx.response.body = JSON.stringify({ user: users[userIndex], message: `Success authorization user: ${users[userIndex].id};) `, status: 'ok' });
            } else {
              console.error(`This user is already online(`);
              ctx.response.status = 500;
              ctx.response.body = JSON.stringify({ message: `This user id: ${users[userIndex].id} is already online( Log out of your account first!`, status: 'error' });
            }
          } catch (error) {
            console.error(`Error authorization user: ${error.message}`);
            ctx.response.status = 200;
            ctx.response.body = JSON.stringify({ message: `Error authorization user id: ${users[userIndex].id} ${error.message}`, status: 'error' });
          }
    }
}