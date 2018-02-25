
var http = require('http');
var conf = require('./conf.js');
var amazon = require('amazon-product-api');
var shuffle = require('shuffle-array')
var client = amazon.createClient(conf.aws);


const failback = JSON.stringify({"asin":"B073LGMWG9","title":"COFFRET 2017 l'intégrale DOCTEUR WHO SAISONS 1 à 9 + 2 épisodes spéciaux + en bonus : les secrets du docteur enfin révélés !","url":"https://www.amazon.fr/COFFRET-lint%C3%A9grale-DOCTEUR-%C3%A9pisodes-sp%C3%A9ciaux/dp/B073LGMWG9?SubscriptionId=AKIAILCDWDHURXF775TQ&tag=gkdv-21&linkCode=xm2&camp=2025&creative=165953&creativeASIN=B073LGMWG9","pictures":{"small":{"url":"https://images-eu.ssl-images-amazon.com/images/I/41VXOtL5lJL._SL75_.jpg","height":54,"width":75},"medium":{"url":"https://images-eu.ssl-images-amazon.com/images/I/41VXOtL5lJL._SL160_.jpg","height":115,"width":160},"large":{"url":"https://images-eu.ssl-images-amazon.com/images/I/41VXOtL5lJL.jpg","height":359,"width":500}},"price":{"currency":"EUR","amountInCents":7107,"amount":71.07}});
var server = http.createServer(function(req, res) {
  const searchTerms = decodeURI(req.url).replace('/', '');
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'});
  respond(res, searchTerms);
});

function respond(res, searchTerms) {
    try {
        if (searchTerms == 'favicon.ico') {
            res.end(failback);
            return;
        }
        console.log('Searching '+searchTerms);
        return client.itemSearch({
             keywords: searchTerms,
             responseGroup: 'ItemAttributes,Offers,Images',
             domain: conf.aws.domain
         }).then(function(results){
             handleProducts(res, results);
         }).catch(function(err){
             console.log(JSON.stringify(err));
             res.end(failback);
             return
         });
    } catch (e) {
        respond(res, searchTerms);
    }
}
function handleProducts(res, results) {
    console.log("handleProducts");
    try {
        shuffle(results);
        const product = results[0];
        const friendlyProduct = {
            asin: product.ASIN[0],
            title: product.ItemAttributes[0].Title[0],
            url: product.DetailPageURL[0],
            pictures: {
              small: {
                  url: product.SmallImage[0].URL[0],
                  height: parseInt(product.SmallImage[0].Height[0]['_']),
                  width: parseInt(product.SmallImage[0].Width[0]['_'])
              },
              medium: {
                  url: product.MediumImage[0].URL[0],
                  height: parseInt(product.MediumImage[0].Height[0]['_']),
                  width: parseInt(product.MediumImage[0].Width[0]['_'])
              },
              large: {
                  url: product.LargeImage[0].URL[0],
                  height: parseInt(product.LargeImage[0].Height[0]['_']),
                  width: parseInt(product.LargeImage[0].Width[0]['_'])
              }
            },
            features: product.ItemAttributes.Feature,
            binding: product.ItemAttributes.Binding,
            price: {
              currency: product.ItemAttributes[0].ListPrice[0].CurrencyCode[0],
              amountInCents:  parseInt(product.ItemAttributes[0].ListPrice[0].Amount),
              amount:  parseInt(product.ItemAttributes[0].ListPrice[0].Amount) / 100
            }
        };
        return res.end(JSON.stringify(friendlyProduct));
    } catch(e) {
        return res.end(failback);
    }
}
server.listen(conf.port);

console.log("Listen on "+conf.port);
