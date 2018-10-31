const moment = require("moment");
const mathjs = require("mathjs");
const zlib = require("zlib");
const https = require("https");
const url = require("url");

var idx = 0;
var device_loader = require("./devices/device01");

var init_send_events = function(opts) {

    console.log("Init events...");    

    var init_device = device_loader.init_get_beacon();

    var init_beacon = [{
        'deviceInfo' : init_device.device_info,
        'versionInfo' : init_device.version_info,
        'customEvents' : init_device.custom_events
    }];

    send_beacon(init_beacon, opts);
}

var send_events = function(opts) {
    idx++;
    console.log("Event " + (idx) + " of " + opts.num_executions);        

    var device = device_loader.get_beacon();

    var beacon = [{
        'deviceInfo' : device.device_info,
        'versionInfo' : device.version_info,
        'customEvents' : device.custom_events
    }];

    send_beacon(beacon, opts);

    if (idx < opts.num_executions) {
        var timeout = mathjs.round(mathjs.random(opts.min_delay, opts.max_delay));
        setTimeout(function() { send_events(opts); }, timeout);
    }
};

var send_beacon = function(beacon, opts) {     

    // URL Parsing
    var collector_url = url.parse(opts.collector_url);
    var hostname = collector_url.hostname;
    var port = (collector_url.port) ? collector_url.port : ((collector_url.protocol.startsWith('https')) ? "443" : "80");

    if (opts.verbose) {
        console.log(JSON.stringify(beacon));    
    }

    var path = '/eumcollector/iot/v1/application/' + opts.app_key + '/beacons';    

    var buf = Buffer.from(JSON.stringify(beacon), 'UTF-8');
    zlib.gzip(buf, function(_, result) {                    

        var options = {
            hostname: hostname,
            port: port,
            path: path,
            method: 'POST',
            headers: {'Content-Encoding': 'gzip', 'Content-Type' : 'application/json', 'Accept': 'application/json'} // signal server that the data is compressed
        };

        var req = https.request(options, function(res) {
            if (opts.verbose) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
            }
            res.setEncoding('utf8');
            if (opts.verbose) {
                res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                });
            }
        });

        req.on('error', function(e) {
            console.log('problem with request: ' + e.message);
        });

        req.write(result);
        req.end();
    });  
};

module.exports = {
    init_send_events: init_send_events,
    send_events: send_events
};

//send_events();