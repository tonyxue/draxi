//CasperJS initializations and settings
var casper = require('casper').create({
        verbose: true,
        logLevel: "debug",
        pageSettings: {
                loadImages: false, // Do not load images to improve loading speed
                silentErrors: true //this must be enabled otherwise there would be irrelevant info in the output
        }
});
var urls = [
        'http://proxy-list.org/english/index.php?p=1',
        'http://proxy-list.org/english/index.php?p=2',
        'http://proxy-list.org/english/index.php?p=3',
        'http://proxy-list.org/english/index.php?p=4',
        'http://proxy-list.org/english/index.php?p=5',
        'http://proxy-list.org/english/index.php?p=6',
        'http://proxy-list.org/english/index.php?p=7',
        'http://proxy-list.org/english/index.php?p=8',
        'http://proxy-list.org/english/index.php?p=9',
        'http://proxy-list.org/english/index.php?p=10'
];
var ip,country,row;

casper.userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) \
                AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.101 \
                Safari/ 537.36");

//For each url in urls, open and fetch
casper.start().each(urls,function(self, url){
        self.thenOpen(url,function(){
                for(row = 1; row <= 27; row+=2)
                {
                        ip = this.fetchText('#proxy-table > div.table-wrap > div\
                                > ul:nth-child(' + row + ') > li.proxy');
                        country = this.fetchText('#proxy-table > div.table-wrap\
                                > div > ul:nth-child(' + row + ') >\
                                li.country-city >       div > span.country >\
                                span > span.name');
                        if(country == 'China')
                        {
                                this.echo(ip);
                        }
                }
        });
});

casper.run();
