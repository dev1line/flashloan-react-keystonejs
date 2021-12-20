const { Text, Relationship, Checkbox } = require("@keystonejs/fields");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");
const { imageSet } = require("./ImageCloud");
const access = require("../access.control");

const orgImgAdapter = imageSet("Flashloans");

const Property = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
      isUnique: true,
    },
    content: {
      type: Relationship,
      ref: "Property",
      many: true,
    },
    key: {
      type: Text,
      // isRequired: true,
    },
    value: {
      type: Text,
      // isRequired: true,
    },
    url: {
      type: Text,
    },
    image: {
      type: CloudinaryImage,
      adapter: orgImgAdapter,
    },
  },
  access: {
    read: true,
    update: access.userIsAdmin,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
  },
};

module.exports = Property;
