const { Text } = require("@keystonejs/fields");
const access = require("../access.control");
const { imageSet } = require("./ImageCloud");

const orgImgAdapter = imageSet("Flashloans");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");
const User = {
  fields: {
    image: {
      type: CloudinaryImage,
      adapter: orgImgAdapter,
    },
    url: {
      type: Text,
      isRequired: true,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdmin,
    update: access.userIsAdmin,
    create: true,
    delete: access.userIsAdmin,
  },
  // hooks: {
  //   afterChange: ({ operation, updatedItem }) => {
  //     if (operation === "create") {
  //       // const sent = reply({
  //       //   name: updatedItem.name,
  //       //   email: updatedItem.email
  //       // })
  //       //   .then(info => {
  //       //     // console.log("Message sent: %s", info.messageId);
  //       //     // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  //       //     // // Preview only available when sending through an Ethereal account
  //       //     // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  //       //     // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  //       //   })
  //       //   .catch(e => console.log(e));
  //       console.log(updatedItem, sent);
  //     }
  //   }
  // }
};

module.exports = User;
