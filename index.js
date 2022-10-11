'use strict';
let url = require('url'), util = require('util');
require('./string');
// *****************************************************************************************************
console.log('-----^^^-----');
let http = require('http'), httpProxy = require('http-proxy');
// 300000 = 5 минут | proxyTimeout исходящие прокси запросы, timeout входящие прокси запросы.
let proxy = httpProxy.createProxyServer({secure: false, proxyTimeout: 300000, timeout: 300000});
let server = http.createServer(function (req, res) {
    try {
        req.url = req.url.mtch(/\/ghY34jkl\/\?data=(.+)/, 1);
        if (!req.url) return resEnd(res, 'Hello!');
        req.url = decodeURIComponent(req.url);
        let host = url.parse(req.url).host;
        if (!host) return resEnd(res, 'Hello!!!');
        req.headers.host = host;
        proxy.web(req, res, {target: {...url.parse(req.url), path: null}});
    } catch (e) {
        console.log(e);
        resEnd(res, util.format(e));
    }
});
server.listen(8000);
proxy.on('error', function (err, req, res) {
    console.log(err);
    resEnd(res, 'err.on: \n' + util.format(err));
});

// ----------------------------------------------
function resEnd(res, s) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    return res.end(s);
}
// -----------------------------------------------------------------------------------------------------------

