const MongoDBClient = require('./index.js');

const DB_NAME = 'sagaPedidosDB';
const COLLECTION_NAME = 'pedidos';

class PedidoDatabase {
    constructor() {
        this.client = new MongoDBClient(DB_NAME);
      
        this.collection = null; 
    }

    async init() {
        await this.client.connect();
        this.collection = this.client.getCollection(COLLECTION_NAME);

        await this.collection.createIndex(
            { pedidoId: 1 }, 
            { unique: true, name: 'unique_pedidoId_index' }
        );
        console.log(`[PedidoDB] Índice 'pedidoId' garantido na coleção '${COLLECTION_NAME}'.`);
    }

    async create(pedidoObj) {
        const result = await this.collection.insertOne(pedidoObj);
        return result.insertedId;
    }

    async get(pedidoId) {
        return this.collection.findOne({ pedidoId });
    }
    
    async update(pedidoId, newStatus, eventEntry) {
        return this.collection.updateOne(
            { pedidoId },
            {
                $set: { status_atual: newStatus },
                $push: { historico: eventEntry } 
            }
        );
    }
}

module.exports = new PedidoDatabase();
