//CasperJS initializations and settings
var casper = require ('casper').create({
        verbose: true,
        logLevel: "debug",
        pageSettings: {
                loadImages: false, // Do not load images to improve the loading speed
                silentErrors: true //this must be enabled otherwise there would be irrelevant info in the output
        }
});

//Trying to disable requests to Google Ads but failed
casper.on('page.resource.requested', function(requestData, request) {
        if (requestData.url.indexOf('http://googleads.g.doubleclick.net/') === 0) {
                request.abort();
        }
        else if (requestData.url.indexOf('https://www.google.com') === 0){
                request.abort();
        }
});

casper.on('navigation.requested', function(url, navigationType, navigationLocked, isMainFrame){
        if (url.indexOf('http://googleads.g.doubleclick.net/') === 0)
        {
                this.echo("Requesting Google!Abort!!");
                request.abort();
                this.echo("Aborted!");
        }
});
var baseUrl = "http://proxyhttp.net/free-list/anonymous-server-hide-ip-address/";
var url,ip,port,country,pgNo,cssPath;

casper.userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 Safari/537.36'); 

casper.start();

casper.then(function(){
        url = baseUrl + pgNo;
        this.open(url);
        this.then(function(){
                for (var i = 2; i < 21; i++) {
                        //'#incontent > table.proxytbl > tbody > tr:nth-child(' + i + ')> td.t_ip'
                        //Css path of one row
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
