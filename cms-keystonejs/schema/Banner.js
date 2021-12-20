const { Text, Relationship } = require("@keystonejs/fields");
const access = require("../access.control");

const Banner = {
  fields: {
    name: { type: Text, isUnique: true, isRequired: true },
    property: {
      type: Relationship,
      ref: "Property",
      many: true,
    },
  },
  access: {
    read: true,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
  },
};

module.exports = Banner;
