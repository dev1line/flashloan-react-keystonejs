const { Text } = require("@keystonejs/fields");
const { CloudinaryImage } = require("@keystonejs/fields-cloudinary-image");
const { imageSet } = require("./ImageCloud");
const fileAdapter = imageSet("Flashloans");
// const cloudinary = require("cloudinary").v2;
const Video = {
  fields: {
    name: { type: Text },
    title: { type: Text },
    subTitle: { type: Text },
    video: { type: Text },
    poster: { type: CloudinaryImage, adapter: fileAdapter },
    //   file: {
    //     type: File,
    //     adapter: fileAdapter,
    //   },
    // },
    // hooks: {
    //   resolveInput: async ({ resolvedData }) => {
    //     console.log("resolveInput", resolvedData);
    //     const { file } = resolvedData;
    //     // cloudinary.config({
    //     //   cloud_name: "dh8l9y2c2",
    //     //   api_key: "851126427775911",
    //     //   api_secret: "qkWJ_FfTcGKDlAUsRYhrT6",
    //     //   secure: true,
    //     // });
    //     if (!!file)
    //       cloudinary.v2.uploader.upload(
    //         file,
    //         {
    //           resource_type: "video",
    //           public_id: "NapaFile/video/my_dog",
    //           overwrite: true,
    //         },
    //         function (error, result) {
    //           console.log(result, error);
    //           if (!error) {
    //             return result;
    //           }
    //         }
    //       );
    //   },
  },
};
module.exports = Video;
