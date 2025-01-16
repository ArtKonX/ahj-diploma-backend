const users = require("../users.json");

module.exports = function QueryRegister(ctx, next) {
    if (ctx, next) {
        try {
            const createData = ctx.request.body;

            const userInfo = {
              id: crypto.randomUUID(),
              email: createData.email,
              name: createData.name,
              password: createData.password,
              status: 'online'
            };

            if (userInfo.email && userInfo.name && userInfo.password) {

              const findDuplicate = users.filter(user => (user.email == userInfo.email) || (user.name == userInfo.name));

              if (findDuplicate.length == 0) {
                users.push(userInfo);

                console.error(`Success register new user;)`);
                ctx.response.status = 200;
                ctx.response.body = JSON.stringify({ user: userInfo, message: `Success register new user: ${userInfo.id};) `, status: 'ok' });
              } else {
                console.error(`Such an email or name already exists!`);
                ctx.response.status = 500;
                ctx.response.body = JSON.stringify({ message: `Such an email or name already exists!`, status: 'error' });
              }
            }
          } catch (error) {
            console.error(`Error register new user: ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error register new user: ${error.message}`, status: 'error' });
          }
    }
}