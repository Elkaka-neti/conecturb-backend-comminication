const eventTypes = require("../utils/eventTypes.js")

module.export = (req, res) => {
  const {data, type} = req.body;
  const {user, store, itens = []} = data;
  
  switch(type) {
    case eventTypes.PEDIDO_CRIADO:
      //fun() {
      break; 
    case eventTypes.LOJA_ACEITOU:
      //fun() {
      break;
    case eventTypes.LOJA_RECUSOU:
      //fun() {
      break;
    case eventTypes.ENTREGADOR_ACEITOU:
      //fun() {
      break;
    case eventTypes.ENTREGADOR_RECUSOU:
      //fun() {
      break;
    case eventTypes.CLIENTE_RECUSOU:
      //fun() {
      break;
    case eventTypes.PEDIDO_CONCLUIDO:
      //fun() {
      break;
    default:
      //fun default() {
      break;
  }
}
