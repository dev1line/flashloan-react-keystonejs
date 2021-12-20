const { CloudinaryAdapter } = require('@keystonejs/file-adapters')

const imageSet = nameFolder => {
  const fileAdapter = new CloudinaryAdapter({
    cloudName: 'dh8l9y2c2',
    apiKey: '851126427775911',
    apiSecret: 'qkWJ_FfTcGKDlAUsRYhrT6-PyHg',
    folder: nameFolder
  })
  return fileAdapter
}

module.exports = {
  imageSet
}
