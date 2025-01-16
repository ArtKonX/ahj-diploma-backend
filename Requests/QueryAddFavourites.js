const catagories = require("../categories.json");

module.exports = function QueryAddFavourites(ctx, next) {
    if (ctx, next) {
        try {

            const { id, userId } = ctx.request.body;

            catagories.forEach(catagory => {
                if (!catagory['favourites']) {
                    catagory['favourites'] = [];
                }

                const messagesUser = catagory['allMessages'].filter(message => message.userId == userId);

                if (messagesUser) {

                    const messageFavourites = messagesUser.find(mess => mess.id == id);

                    if (messageFavourites) {

                        const doublon = catagory['favourites'].find(message => message.id === messageFavourites.id)

                        if (doublon) {
                            console.error(`Error added in favourites with id because it has already been added: ${id} (`);
                            ctx.response.status = 500;
                            ctx.response.body = JSON.stringify({ favourites: [], message: `Error added in favourites with id: ${id} (`, status: 'error' });
                        } else {
                            catagory['favourites'].unshift(messageFavourites);
                            ctx.response.status = 200;
                            console.error(`Success added in favourites with id: ${id} ;)`);
                            ctx.response.body = JSON.stringify({ favourites: messageFavourites, message: `Success added in favourites with id: ${id} ;)`, status: 'ok' });
                        }
                    } else {
                        console.error(`Error added in favourites with id: ${id} (`);
                        ctx.response.status = 500;
                        ctx.response.body = JSON.stringify({ favourites: [], message: `Error added in favourites with id: ${id} (`, status: 'error' });
                    }
                }
            })
        } catch (error) {
            console.error(`Error added in favourites( ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error added in favourites( ${error.message}`, status: 'error' });
        }
    }
}