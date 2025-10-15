const PedidoFila = require('../Messaging/PedidoFila');
const eventTypes = require("../utils/eventTypes.js");

async function worker(event) {
    switch(event.type) {
      case eventTypes.PEDIDO_CRIADO:
        //fun() {
        break;
      case eventTypes.NOTICAR_LOJA:
        //fun() {
        break;
      default:
        //fun() {
        break;
    }
    console.log(`Processando evento: ${event.type} para pedido ${event.data.pedidoId}`);
}

PedidoFila.work(worker); 
