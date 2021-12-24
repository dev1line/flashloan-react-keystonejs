const { Text, Relationship } = require("@keystonejs/fields");
const access = require("../access.control");
const { imageSet } = require("./ImageCloud");

const orgImgAdapter = imageSet("Flashloans");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");
const UserProfile = {
  fields: {
    address: {
      type: Text,
    },
    nickname: {
      type: Text,
    },
    referralCode: {
      type: Text,
    },
    referrals: {
      type: Relationship,
      ref: "Referral",
    },
    avatar: {
      type: CloudinaryImage,
      adapter: orgImgAdapter,
    },
    history: {
      type: Relationship,
      ref: "History",
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdmin,
    update: access.userIsAdmin,
    create: true,
    delete: access.userIsAdmin,
  },
};

module.exports = UserProfile;
