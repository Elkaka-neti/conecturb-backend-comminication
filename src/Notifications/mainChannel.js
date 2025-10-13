class MainChannel {
  async send(user, messageTemplate, params) {
    console.error("[502] O metodo só pode ser utilizado dentro de uma classe de agente.")
  }
}

module.exports = MainChannel;