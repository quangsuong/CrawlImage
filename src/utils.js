const qs = require('qs');
const Path = require("path");
const fs = require("fs");
const axios = require('axios').default;

exports.downloadImage = async (imageUrl, fileName) => {
    if (imageUrl.indexOf('.png') !== -1 || imageUrl.indexOf('.jpg') !== -1|| imageUrl.indexOf('.webp') !== -1) {
        let path = Path.resolve(__dirname, '../images', fileName);
        const writer = fs.createWriteStream(path);
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream',
        });
        await response.data.pipe(writer);

        return await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
};
