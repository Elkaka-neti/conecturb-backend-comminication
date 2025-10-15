const PedidoFila = require('../messaging/PedidoFila');

async function worker(event) {
    // switch/case
    console.log(`Processando evento: ${event.type} para pedido ${event.data.pedidoId}`);
}

PedidoFila.work(worker); 
