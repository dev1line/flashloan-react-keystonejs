const { Text, Relationship, Integer } = require("@keystonejs/fields");
const access = require("../access.control");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");

const { imageSet } = require("./ImageCloud");

const orgImgAdapter = imageSet("Flashloans");

const Page = {
  fields: {
    name: { type: Text, isUnique: true, isRequired: true },
    layouts: {
      type: Relationship,
      ref: "Layout",
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

module.exports = Page;
