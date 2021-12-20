const { Text } = require("@keystonejs/fields");
const access = require("../access.control");
const { reply } = require("../emails");

const Contact = {
  fields: {
    name: { type: Text },
    role: { type: Text },
    company: { type: Text },
    address: { type: Text },
    phone: { type: Text },
    email: { type: Text },
    message: { type: Text },
  },
  access: {
    read: access.userIsAdmin,
    update: access.userIsAdmin,
    create: true,
    delete: access.userIsAdmin,
  },
  hooks: {
    afterChange: async ({ operation, updatedItem }) => {
      if (operation === "create") {
        const customerInfo = {
          name: updatedItem.name,
          role: updatedItem.role,
          email: updatedItem.email,
          message: updatedItem.message,
          phone: updatedItem.phone,
          address: updatedItem.address,
          company: updatedItem.company,
        };

        await reply(customerInfo, "notifyToBOD");
      }
    },
  },
};

module.exports = Contact;
