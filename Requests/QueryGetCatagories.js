const catagories = require("../categories.json");

module.exports = function QueryGetCatagories(ctx, next) {
    if (ctx, next) {
        try {
            const userId = ctx.request.query.userId
            const catagoryCurrent = ctx.request.query.categoryCurrent;

            catagories.forEach(catagory => {
                const findCatagory = catagory[catagoryCurrent]

                if (findCatagory) {

                    const findCatagoryUser = findCatagory.filter(message => message.userId == userId);

                    if (findCatagoryUser) {
                        console.error(`Success find catagory - ${catagoryCurrent} with user id: ${userId} ;)`);
                        ctx.response.status = 200;
                        ctx.response.body = JSON.stringify({ catagory: findCatagoryUser, message: `Success find catagory - ${catagoryCurrent} with user id: ${userId} ;)`, status: 'ok' });
                    }
                } else {
                    console.error(`Error find catagory - ${catagoryCurrent} with user id: ${userId} (`);
                    ctx.response.status = 500;
                    ctx.response.body = JSON.stringify({ catagory: [], message: `Error find catagory - ${catagoryCurrent} with user id: ${userId} (`, status: 'error' });
                }
            })
        } catch (error) {
            console.error(`Error find catagory: ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error find catagory: ${error.message}`, status: 'error' });
        }
    }
}