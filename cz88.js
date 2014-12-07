var cheerio = require("cheerio");
var downloadjs = require("./download.js");
var baseUrl = 'http://www.cz88.net/proxy/index';
var maxPgNo = 10; // Max page number
var rowNo = 2;
var url = '';
var ip = '';
var port = '';
var loc = '';
var result = '';

var cities = ['北京','天津','上海','重庆', '河北', '河南', '云南', '辽宁', '黑龙江', '湖南', '安徽', '山东', '新疆', '江苏', '浙江', '江西', '湖北', '广西', '甘肃', '山西', '内蒙古', '陕西', '吉林', '福建', '贵州', '广东', '青海', '西藏', '四川', '宁夏', '海南'];

for (var pgNo=1,i<=maxPgNo,pgNo++)
{
        if (pgNo==1){ url = baseUrl + '.aspx' }
        else { url = baseUrl + pgNo + '.aspx' }
        download (url, function(data) {
              if (data) {
                        var $ = cheerio.load(data);
                        while($("div.Main > table > tbody > tr:nth-child(" + rowNo + ") > td:nth-child(1)").text() != '')
                        {
                                ip = $("div.Main > table > tbody > tr:nth-child(" + rowNo + ") > td:nth-child(1)").text();
                                port = $("div.Main > table > tbody > tr:nth-child(" + rowNo + ") > td:nth-child(2)").text();
                                loc = $("div.Main > table > tbody > tr:nth-child(" + rowNo + ") > td:nth-child(5)").text();

                                for (var k = 0; k < cities.length; k++) //There should be a better way using Cheerio to avoid double loops
                                {
                                        if (loc.indexOf(cities[k]) > -1)
                                        {
                                                result = ip + ":" + port;
                                                // put the data into the database
                                                break;
                                        }
                                }
                                
                                rowNo++;
                        }
              }
              else
                {
                        console.log('Error!');
                }
        }
}
