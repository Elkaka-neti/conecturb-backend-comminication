const MainChannel = require("../mainChannel.js");
class Whatsapp extends MainChannel {
  async send(user, messageTemplate, params) {
    console.log("[200] Mensagem whatsapp enviada com sucesso!")
  }
}
module.exports = Whatsapp;