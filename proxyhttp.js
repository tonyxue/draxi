var cheerio = require("cheerio");
var downloadjs = require("./download.js");
var baseUrl = "http://proxyhttp.net/free-list/anonymous-server-hide-ip-address/";
var url = '';
var maxPgNo = 9;
var ip = '';
var port = '';
var country = '';

 for (var pgNo = 1; pgNo <= maxPgNo; pgNo++)
{
        url = baseUrl + pgNo;
        download (url, function(data) {
                if (data) {
                        var $ = cheerio.load(data);
                        for (var i = 2; i <= 21; i++)
                        {
                                ip = $("#incontent > table.proxytbl > tbody > tr:nth-child(" + i +") > td.t_ip").text();
                                port = $("#incontent > table.proxytbl > tbody > tr:nth-child(" + i +") > td.t_port").text();
                                country = $("#incontent > table.proxytbl > tbody > tr:nth-child(" + i +") > td.t_country").text();
                                if ( country == "China")
                                {
                                        // Save into the database
                                }
                        }
                }
                else
                {
                        console.log("Error!");
                }
        })
}
