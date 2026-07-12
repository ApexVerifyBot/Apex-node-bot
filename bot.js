require("./handlers/start")();
require("./handlers/profile")();

require("./handlers/support")();

require("./handlers/referral")();

const users = require("./utils/users");
const banned = require("./utils/banned");
const stats = require("./utils/stats");
const helper = require("./utils/helpers");
const TelegramBot = require("node-telegram-bot-api");

const config = require("./config");

const bot = new TelegramBot(config.BOT_TOKEN, {

polling: true

});

console.log("Apex Verify Bot Started");

bot.onText(/\/start/, (msg) => {

bot.sendMessage(

msg.chat.id,

config.WELCOME_MESSAGE,

{

parse_mode: "HTML"

}

);

});

bot.on("polling_error", console.log);

module.exports = bot;
