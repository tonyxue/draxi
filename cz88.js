//CasperJS initializations and settings
var casper = require ('casper').create({
        verbose: true,
        logLevel: "debug",
        pageSettings: {
                loadImages: false, //Do not load images to imporve loading speed
        }
});

var urls = [
        'http://www.cz88.net/proxy/index.aspx',
        'http://www.cz88.net/proxy/http_2.aspx',
        'http://www.cz88.net/proxy/http_3.aspx',
        'http://www.cz88.net/proxy/http_4.aspx',
        'http://www.cz88.net/proxy/http_5.aspx',
        'http://www.cz88.net/proxy/http_6.aspx',
        'http://www.cz88.net/proxy/http_7.aspx',
        'http://www.cz88.net/proxy/http_8.aspx',
        'http://www.cz88.net/proxy/http_9.aspx',
        'http://www.cz88.net/proxy/http_10.aspx'
];
var rowNo,pgNo;
var url,ip,port,loc,result;

var cities = ['北京', '天津', '上海', '重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南'];

function sleep(sleepTime) {
               for(var start = Date.now(); Date.now() - start <= sleepTime; ) { } 
}

casper.start().each(urls, function(self, url)
{
        self.thenOpen(url, function(){
                for(rowNo = 2; rowNo < 139; rowNo++)
                {
                        if(rowNo == 27) continue;
                        if(rowNo == 53) continue;
                         
                        ip = this.fetchText("#Content > div.Main > table > tbody > tr:nth-child(" + rowNo + ") > td:nth-child(1)");
                        port = this.fetchText("#Content > div.Main > table > tbody > tr:nth-child(" + rowNo + ") > td:nth-child(2)");
                        loc = this.fetchText("#Content > div.Main > table > tbody > tr:nth-child(" + rowNo + ") > td:nth-child(5) > div.addr_style");

                        //for (var k = 0; k < cities.length; k++) //There should be a better way using Cheerio to avoid double loops
                        //{
                        //        if (loc.indexOf(cities[k]) > -1)
                        //        {
                                        //result = ip + ":" + port;
                                        // put the data into the database
                                        //this.echo("Found:"+result+"@"+loc);
                                         //break;
                        //        }
                        //}

                        sleep(100);
                }
        });
});

casper.run();

