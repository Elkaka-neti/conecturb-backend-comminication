const Whatsapp = require('./Whatsapp');
const ExpoNot = require('./Mobile');

class Notifications {
  static async create(user, messageTemplate, params = {}) {
    if (!user) {
      console.error("[404] Parâmetro 'user' não encontrado");
      return;
    }

    const channels = [];
    if (user.notifications.allows.includes("whatsapp")) channels.push(new Whatsapp());
    if (user.notifications.allows.includes("expoApp")) channels.push(new ExpoNot());

    for (const ch of channels) {
      try {
        await ch.send(user, messageTemplate, params);
      } catch (e) {
        console.error(`[500] Falha ao enviar mensagem via :`, e.message);
      }
    }
  }

  static async broadcast(users, messageTemplate, params = {}) {
    const lista = users.map(async user => {
      try {
        await Notifications.create(user, messageTemplate, params);
      } catch (e) {
        console.error(`[500] Não foi possível notificar o usuário:`, e.message);
      }
    });

    // todas as promessas serao resolvidas, mesmo se algumas falharem
    return await Promise.allSettled(lista);
  }
}

module.exports = Notifications;