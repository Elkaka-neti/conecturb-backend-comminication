const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'; 

class MongoDBClient {
    constructor(dbName) {
        if (!dbName) {
            throw new Error("O nome do banco de dados (dbName) é obrigatório.");
        }
        this.client = new MongoClient(MONGODB_URI);
        this.dbName = dbName;
        this.db = null;
        this.isConnected = false;
    }

    async connect() {
        if (this.isConnected) {
            return;
        }
        
        try {
            await this.client.connect();
            this.db = this.client.db(this.dbName);
            this.isConnected = true;
            console.log(`MongoDB: Conectado ao banco de dados '${this.dbName}'.`);
        } catch (error) {
            console.error(`ERRO: Falha ao conectar ao MongoDB (${this.dbName}):`, error);
            throw error;
        }
    }
    
    getCollection(collectionName) {
        if (!this.isConnected || !this.db) {
            throw new Error("A conexão com o MongoDB não foi estabelecida. Chame connect() primeiro.");
        }
        return this.db.collection(collectionName);
    }
}

module.exports = MongoDBClient;
