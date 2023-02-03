const http = require('http');
const ws = require('ws');

const wss = new ws.Server({ noServer: true });

const accept = (req, res) => {
    if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
        res.end();
        return;
    }

    if (!req.headers.connection.match(/\bupgrade\b/i)) {
        res.end();
        return;
    }

    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
};

const onConnect = (ws) => {
    ws.on('message', (message) => {
        console.log(message);
        ws.send(`Hello!`);

        setTimeout(() => ws.close(1000, "Bye!"), 5000);
    });

    ws.on('error', (error) => console.error(error));
};

http.createServer(accept).listen(3000);