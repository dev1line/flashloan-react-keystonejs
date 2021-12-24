const { Text } = require("@keystonejs/fields");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");
const access = require("../access.control");
const { imageSet } = require("./ImageCloud");
const orgImgAdapter = imageSet("Flashloans");
const Token = {
  fields: {
    name: { type: Text },
    symbol: { type: Text },
    image: {
      type: CloudinaryImage,
      adapter: orgImgAdapter,
    },
    address: { type: Text },
    sender: { type: Text },
  },
  access: {
    read: true,
    update: access.userIsAdmin,
    create: true,
    delete: access.userIsAdmin,
  },
};

module.exports = Token;
