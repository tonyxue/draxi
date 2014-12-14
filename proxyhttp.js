var casper = require ('casper').create({
        verbose: true,
        logLevel: "debug",
        pageSettings: {
                loadImages: false,
                silentErrors: true //this must be enabled otherwise there would be irrelevant info in the output
        }
});

casper.on('page.resource.requested', function(requestData, request) {
            if (requestData.url.indexOf('http://googleads.g.doubleclick.net/') === 0) {
                request.abort();
    }
});

var baseUrl = "http://proxyhttp.net/free-list/anonymous-server-hide-ip-address/";
var url = '';
var ip = '';
var port = '';
var country = '';
var pgNo = '';
var cssPath = '';

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36'); 

casper.start();

casper.then(function(){
        url = baseUrl + pgNo;
        this.open(url);
        this.then(function(){
                for (var i = 2; i < 21; i++) {
                        //'#incontent > table.proxytbl > tbody > tr:nth-child(' + i + ')> td.t_ip'
                        cssPath = '#incontent > table.proxytbl > tbody > tr:nth-child(' + i + ')';
                        if (this.exists(cssPath)) {
                                ip = this.fetchText(cssPath + ' > td.t_ip');
                                port = this.fetchText(cssPath + ' > td.t_port');
                                port = port.substring(port.indexOf('>') + 1,port.length - 1).replace(/\s{1,}/g,"");
                                country = this.fetchText(cssPath + ' > td.t_country');
                                if (country == 'China')
                                {
                                        this.echo(ip+':'+ port);
                                }
                        }
                }
        });
});
casper.run();
