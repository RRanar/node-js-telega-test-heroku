const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
    ctx.reply(`Hello, ${ctx.message.from.username}`);

 //  ctx.telegram.sendMessage(process.env.SUPPORT_CHAT_ID, `Walker, ${ctx.message.from.username}, connected`);
});

bot.on('text', (ctx) => {
   // ctx.telegram.sendMessage(process.env.SUPPORT_CHAT_ID, ctx.message);
});


bot.launch();