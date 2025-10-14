const eventTypes = require("../utils/eventTypes.js")
module.export = (req, res) => {
  const {data, type} = req.body;
  const {user, store, itens = []} = data;
  

}