const axios = require('axios');
const cheerio = require('cheerio');
const utils = require('./src/utils');

const pageUrl = 'https://www.pngwing.com/en/search?q=dragon+ball+z&page=23';
const crawlImage = async () =>{
    const reponse = await axios.get(pageUrl);
    const $ = cheerio.load(reponse.data);
    const imgs = await $('ul#list_ul')
        .find('.grid link')
        .toArray()
        .map(element => $(element).attr('href'));
    imgs.forEach(value => {
        const names = value.split('/')
        utils.downloadImage(value, names[names.length -1])
    })
}
crawlImage();