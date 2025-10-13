const Whatsapp = require('./Whatsapp');
const ExpoNot = require('./Mobile');
class Notifications {
  static async create(user, messageTemplate, params = {}) {
    const channels = [];
    if(!user) return console.error("[404] Parametro user nao encontrado");
    
    if(user.notifications.allows.includes("whatsapp")) {
      channels.push(new Whatsapp());
    }
    if(user.notifications.allows.includes("expoApp")) {
      channels.push(new ExpoNot());
    }
    
    for(const ch of channels) {
      ch.send(user, messageTemplate, params);
    }
  }
  
  async broadcast(users, messageTemplate, params = {}) {
    const lista = users.map(user => {
      try {
      this.create(user, messageTemplate, params)
      }catch(e){
        console.error("[500] Não foi possivel notificar esse usuario.")
      }
    });
    
    //Mesmo se alguns falharem a promessa é resolvida.
    return await Promise.allSettled(lista);
  }
  
}

module.exports = Notifications;