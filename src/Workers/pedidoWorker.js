const PedidoFila = require('../Messaging/pedidoFila');
const eventTypes = require("../../utils/eventTypes.js");

async function worker(event) {
    switch(event.type) {
      case eventTypes.PEDIDO_CRIADO:
        //fun() {
        break;
      case eventTypes.NOTICAR_LOJA:
        //fun() {
        break;
      case eventTypes.LOJA_ACEITOU:
        //fun() {
        break;
      case eventTypes.LOJA_RECUSOU:
        //fun() {
        break;
      case eventTypes.NOTIFICAR_ENTREGA:
        //fun() { 
        break;
      case eventTypes.ENTREGADOR_ACEITOU:
        //fun() { 
        break;
      case eventTypes.ENTREGADOR_RECUSOU:
        //fun() { 
        break;
      case eventTypes.PEDIDO_CONCLUIDO:
        //fun() { 
        break;
      case eventTypes.CLIENTE_RECUSOU:
        //fun() { 
        break;
      default:
        //fun() {
        return;
    }
    console.log(`Processando evento: ${event.type} para pedido ${event.data.pedidoId}`);
}

PedidoFila.work(worker); 
