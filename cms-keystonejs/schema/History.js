const { Text } = require("@keystonejs/fields");
const access = require("../access.control");

const History = {
  fields: {
    name: { type: Text },
    sender: { type: Text },
    history: { type: Text },
    profit: { type: Text },
    txhash: { type: Text },
  },
  access: {
    read: true,
    update: access.userIsAdmin,
    create: true,
    delete: access.userIsAdmin,
  },
};

module.exports = History;
