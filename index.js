
var http = require('http');
var conf = require('./conf.js');
var amazon = require('amazon-product-api');
var shuffle = require('shuffle-array')
var client = amazon.createClient(conf.aws);


var server = http.createServer(function(req, res) {
  const searchTerms = decodeURI(req.url).replace('/', '');
  res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8', 'Access-Control-Allow-Origin': '*'});
  respond(res, searchTerms);
});

function respond(res, searchTerms) {
    try {
        return client.itemSearch({
             keywords: searchTerms,
             responseGroup: 'ItemAttributes,Offers,Images',
             domain: conf.aws.domain
         }).then(function(results){
             handleProducts(res, results);
         }).catch(function(err){
             console.log(JSON.stringify(err));
         });
    } catch (e) {
        respond(res);
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
        return handleProducts(res, results);
    }
}
server.listen(conf.port);

console.log("Listen on "+conf.port);
