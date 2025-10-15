const eventTypes = {
PEDIDO_CRIADO: "pedido.criado",
NOTIFICAR_LOJA: "pedido.notificar.loja",
LOJA_ACEITOU: "loja.aceitou",
LOJA_RECUSOU: "loja.recusou",
NOTIFICAR_ENTREGADORES: "pedido.notificar.entrega",
ENTREGADOR_ACEITOU: "entregador.aceitou",
ENTREGADOR_RECUSOU: "entregador.recusou",
PEDIDO_CONCLUIDO: "pedido.concluido",
CLIENTE_RECUSOU: "cliente.recusou"
}

module.exports = eventTypes;