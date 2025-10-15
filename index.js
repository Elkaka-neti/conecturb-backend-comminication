const express = require('express');
const path = require('path');
const PedidoDatabase = require('./src/Database/Permanent/pedidoDatabase');
const registerRoutes = require('./utils/registerRouters');

const app = express();

async function startApp() {
    try {
        await PedidoDatabase.init();
        console.log("Conexão com o MongoDB estabelecida e índices garantidos.");
    } catch (error) {
        console.error("ERRO FATAL: Falha ao iniciar o banco de dados.", error);
        process.exit(1);
    }

    app.use(express.json());

    app.get("/", (req, res) => {
        res.send("hello");
    });  

    const routerDir = path.join(__dirname, 'routers');
    registerRoutes(app, routerDir);

    app.listen(3000, '127.0.0.1', () => {
        console.log('Servidor rodando na porta 3000');
    });
}

startApp();

module.exports = app;
