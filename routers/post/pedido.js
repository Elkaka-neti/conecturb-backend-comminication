const {v4: uuidv4} = require("uuid");
const PedidoDb = require("../src/Databases/Permament/pedidoDatabase.js");
const eventType = require("../utils/eventTypes.js");
const PedidoFila = require("../src/Messaging/pedidoFila.js")

module.exports = async(req, res) => {
  const {data, type} = req.body;
  const {user, store, itens = []} = data;
try {
  const pedidoId = uuidv4();
  
const pedidoObj = {
pedidoId: pedidoId,
status_atual: eventTypes.PEDIDO_CRIADO,
user, 
store,
itens,
historico: [
  {
    type: eventTypes.PEDIDO_CRIADO,
    time: new Date().toISOString()
  }
]
}

await PedidoDb.create(pedidoObj);
await PedidoFila.add(eventTypes.PEDIDO_CRIADO, {pedidoId, user, itens, store});

res.status(201).json({message: 'Pedido aceito, notificação em processo...', status: 'pending', pedidoId})

}catch(err){
  console.error("[500] Erro no processamento do pedido.", err)
  
  res.status(500).json({message: 'Não foi possivel processar o pedido', status: 'bad'})
}
}
