const next = require('next');
const express = require('express');
const wooConfig = require('./wooConfig');

const WooCommerceAPI = require('woocommerce-api');

const WooCommerce = new WooCommerceAPI({
    url: wooConfig.siteUrl,
    consumerKey: wooConfig.consumerKey,
    consumerSecret: wooConfig.consumerSecret,
    wpAPI: true,
    version: 'wc/v1'
});

const port = 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        server.get('/getProducts', (req, res) => {
            WooCommerce.get('products', function (err, data, response) {
                res.json(JSON.parse(response));
            });
        });

        server.get('*', (req, res) => {
            return handle(req, res);
        });

        server.listen(port, err => {
            if (err) {
                throw err;
            }
            console.log(`> Ready on http://localhost:${port}`);
        })
    })
    .catch(ex => {
        console.error(ex.stack);
        process.exit(1);
    });;