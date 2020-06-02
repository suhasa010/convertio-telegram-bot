//Don't sleep
const http = require("http");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 240000);

const Telegraf = require("telegraf");
const fs = require("fs");
const request = require("request");
const Telegram = require('telegraf/telegram')
const telegram = new Telegram(process.env.BOT_TOKEN)
const got = require('got');

const bot = new Telegraf(process.env.BOT_TOKEN);

    /*{
      "url": "https://api.convertio.co/convert",
      "apikey": "37ea3cff3dbb21b0c69e385e191ffe4d",
      "file": "https://duckduckgo.com/assets/logo_homepage_mobile.normal.v107.svg",
      "outputformat": "png",
      "outputfile": "output.png",
      "input": "url"  
    }*/

//function convertImageTest() {
  //console.log("inside convert func");
async function convertImageTest() {
    try{
      console.log("inside try")
      var body = await got.post('https://api.convertio.co/convert', {
        json: {
            "apikey": "d1cda20bda31db678a1db79994c773a3",
            "file": "https://duckduckgo.com/assets/logo_homepage_mobile.normal.v107.svg",
            "outputformat": "png",
            "input": "url"
        }
        //responseType: 'json'
    }).json(); 
    //console.log(body.data.id);
      var convertid = body.data.id;
      return getConvertStatus(convertid)
    }
    catch(err) {
      console.log("inside catch");
      console.log(err)}
  //console.log(body.data);
  //var convertid = body.data.id;
  //getConvertStatus(convertid)
  }
//} 
  async function getConvertStatus(convertid) {

    try{
      var response = await got.get(`https://api.convertio.co/convert/${convertid}/status`).json();
      console.log(response);
      console.log(response.data.output.url)
      var url = "\'"+response.data.output.url+"\'";
      console.log(url)
      return url;
       }
    catch(err) { console.log(err)}
    //console.log(body.convert);
    //var pic = "feaded29ffbed27cc9bfe0e8aef92004.out_url"
    //return telegram.sendPhoto(response.data.output.url)
  }



bot.command("/start", ctx => {
  ctx.reply("Bot not yet active. Please stay tuned!");
});

bot.command("/convert", ctx => {
  ctx.reply("converting...")
  var pic = convertImageTest();
  //ctx.replyWithPhoto('https://duckduckgo.com/assets/logo_homepage_mobile.normal.v107.svg') 
  ctx.replyWithPhoto({
    url: pic,
    filename: 'kitten.jpg'
  })
})

bot.launch()
