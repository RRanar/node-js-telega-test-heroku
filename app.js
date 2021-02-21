const {Telegraf, session} = require('telegraf');
const Stage = require('telegraf').Scenes.Stage;
const {enter, leave} = require('telegraf').Scenes.Stage;
const remindScene = require('./scenes');
const dateDiff = require('./helpers');
const {remindSchema, mongoose} =  require("./models");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session({
    property:"chatSession",
    getSessionKey: (ctx) => ctx.chat && ctx.chat.id,
}));
const stage = new Stage([remindScene], {sessionName:'chatSession'});
bot.use(stage.middleware());

bot.command('rmnd',ctx => ctx.scene.enter('REMIND_SCENE_ID', ctx.scene.state));

bot.command('start', (ctx) => {
    ctx.reply(`Hello, ${ctx.message.from.username}`);
    ctx.telegram.sendMessage(process.env.SUPPORT_CHAT_ID, `Walker, ${ctx.message.from.username}, connected`);
});

bot.command('age', ctx => {
    const start = new Date('2020-06-17');
    const now = new Date();
    const diff = new dateDiff(start, now);
    ctx.telegram.sendMessage(ctx.chat.id, `Прошло:\n Дней - ${diff.inDays()},\n Месяцев - ${diff.inMonths()},\n Годков - ${diff.inYears()}`);
});

bot.on('text',  ctx => {
    if (ctx.chat.type === 'private') {
       ctx.forwardMessage(process.env.SUPPORT_CHAT_ID, ctx.chat.id, ctx.message.id,ctx.text );
    }
    if (ctx.chat.type === 'group') {
        ctx.telegram.sendMessage(ctx.message.reply_to_message.forward_from.id,  ctx.message.text);
    }
});

bot.launch();