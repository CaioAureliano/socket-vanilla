const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('error', console.error);

    ws.on('message', (data) => {
        console.log(data);
    });

    setInterval(() => ws.send(new Date().toLocaleString(), 1000));
    setTimeout(() => ws.close(), 10000);
});