const Redis = require('ioredis');

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const SAGA_QUEUE_NAME = 'saga:pedidos'; 

class PedidoFila {
    constructor() {
        this.redis = new Redis({ host: REDIS_HOST, port: REDIS_PORT });
        this.queueName = SAGA_QUEUE_NAME;

        this.redis.on('error', (err) => console.error('Redis Fila: Erro de conexão ou I/O:', err));
        this.redis.on('connect', () => console.log(`Redis Fila: Conectado. Fila: ${this.queueName}`));
    }

    async add(eventType, data) {
        if (!eventType || !data) {
            console.error('Dados inválidos para enfileiramento.');
            return;
        }
        
        const payload = {
            type: eventType,
            data: data,
            timestamp: new Date().toISOString()
            
        };
        
        const payloadJSON = JSON.stringify(payload);
        
        return this.redis.rpush(this.queueName, payloadJSON);
    }
    
    async work(pedidoWorker) {
      console.log("[WORKER] Iniciando processamento dos pedidos.");
      while(true) {
        try {
          const result = await this.redis.blpop(this.queueName, 0);
          const payloadJSON = result[1];
          const event = JSON.parse(payloadJSON);
          
          await pedidoWorker(event);
          
        }catch(erro){
          console.error("[WORKER] Erro ao tentar processar pedido.", erro);
          
        }
      }
    }
}

module.exports = new PedidoFila();
