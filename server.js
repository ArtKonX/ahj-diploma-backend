const Koa = require('koa');
const path = require('path');
const koaBody = require('koa-body').default;
const koaStatic = require('koa-static');
const http = require('http');
const WebSocket = require('ws');

const QuerySendFiles = require('./Requests/QuerySendFiles');
const QueryAddFavourites = require('./Requests/QueryAddFavourites');
const QueryDelateFavourites = require('./Requests/QueryDelateFavourites');
const QueryGetCatagories = require('./Requests/QueryGetCatagories');
const QueryAddPin = require('./Requests/QueryAddPin');
const QueryDelatePin = require('./Requests/QueryDelatePin');
const QueryGetPin = require('./Requests/QueryGetPin');
const QueryDownloadFile = require('./Requests/QueryDownloadFile');
const QueryRegister = require('./Requests/QueryRegister');
const QueryAuthorization = require('./Requests/QueryAuthorization');
const QueryExit = require('./Requests/QueryExit');
const QueryMessages = require('./Requests/QueryMessages');
const QueryCreateMessage = require('./Requests/QueryCreateMessage');


const app = new Koa();

const publicPath = path.join(__dirname, '/public');

app.use(koaStatic(publicPath));

const port = process.env.PORT || 7070;

app.use(koaBody({
  text: true,
  urlencoded: true,
  multipart: true,
  json: true,
}));

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    return await next();
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (ctx.request.method === 'OPTIONS') {
    ctx.response.set({
      ...headers,
    });
    ctx.response.status = 204;
  } else {
    ctx.response.set({
      ...headers,
    });
    return await next();
  }
});

const Router = require('koa-router');
const router = new Router();

router.post('/send-file', async (ctx, next) => {

  QuerySendFiles(ctx, next, port, publicPath)
})

router.post('/add-favourites', async (ctx, next) => {

  QueryAddFavourites(ctx, next);
})

router.post('/delate-favourites', async (ctx, next) => {

  QueryDelateFavourites(ctx, next);
})

router.get('/get-catagories', async (ctx, next) => {
  QueryGetCatagories(ctx, next);
});

router.post('/add-pin', async (ctx, next) => {
  QueryAddPin(ctx, next);
})

router.post('/delate-pin', async (ctx, next) => {
  QueryDelatePin(ctx, next);
})

router.get('/get-pin', async (ctx, next) => {
  QueryGetPin(ctx, next);
})

router.get('/download-file/:id', async (ctx, next) => {
  QueryDownloadFile(ctx, next, port, publicPath);
});

router.post('/register', async (ctx, next) => {
  QueryRegister(ctx, next);
});


router.post('/authorization', async (ctx, next) => {
  QueryAuthorization(ctx, next);
});


router.post('/exit', async (ctx, next) => {
  QueryExit(ctx, next);
})

router.get('/messages/:count', async (ctx, next) => {
  QueryMessages(ctx, next);
});

router.post('/create-message', async (ctx, next) => {
  QueryCreateMessage(ctx, next);
});

const server = http.createServer(app.callback());

app.use(router.routes()).use(router.allowedMethods());
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {

  ws.on('message', (message, isBinary) => {

    const receivedMSG = message;
    console.dir(receivedMSG);

    [...wss.clients]
      .filter(o => o.readyState === WebSocket.OPEN)
      .forEach(o => o.send(message, { binary: isBinary }));
  })
});

server.listen(port, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Server is listening to ' + port);
});