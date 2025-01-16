const catagories = require("../categories.json");

module.exports = function QueryDelateFavourites(ctx, next) {
    if (ctx, next) {

        try {

            const { id, userId } = ctx.request.body;

            catagories.forEach(catagory => {

              if (catagory.favourites) {
                const favouritesUser = catagory.favourites.filter(message => message.userId == userId);
                const favouritesDel = favouritesUser.find(fav => fav.id === id);
                const indxDel = catagory.favourites.findIndex(message => message.id == favouritesDel.id);


                if (indxDel !== -1) {

                  catagory.favourites.splice(indxDel, 1);
                  ctx.response.status = 200;
                  console.error(`Success removal favourites with id: ${id} ;)`);
                  ctx.response.body = JSON.stringify({ favourites: favouritesDel, message: `Success removal favourites with id: ${id} ;)`, status: 'ok' });
                } else {
                  console.error(`Error removal favourites with id: ${id} (`);
                  ctx.response.status = 500;
                  ctx.response.body = JSON.stringify({ favourites: [], message: `Error removal favourites with id: ${id} (`, status: 'error' });
                }
              }
            })

          } catch (error) {
            console.error(`Error removal favourites( ${error.message}`);
            ctx.response.status = 500;
            ctx.response.body = JSON.stringify({ message: `Error removal favourites( ${error.message}`, status: 'error' });
          }
    }
}