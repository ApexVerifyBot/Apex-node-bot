const bot = require("../bot");

module.exports = () => {

bot.on("message", msg => {

if (msg.text !== "💬 SUPPORT") return;

bot.sendMessage(

msg.chat.id,

"Support: https://t.me/ApexVerifysupport"

);

});

};
