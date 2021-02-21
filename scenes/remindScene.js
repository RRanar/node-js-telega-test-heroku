const ConstructScene = require('telegraf').Scenes.WizardScene;

const remindScene = new ConstructScene(
    'REMIND_SCENE_ID',
    ctx => {
        ctx.reply('Что напомнить?');
        ctx.wizard.state.remindData= {};
        return ctx.wizard.next();
    },
    ctx => {
        ctx.wizard.state.remindData.text = ctx.message.text;
        const buttons = {
            keyboard: [
                [
                    {text: "Today"},
                    {text: "Tomorow"}
                ]
            ],
            resize_keyboard:true,
            one_time_keyboard:true
        };
        ctx.reply('Когда', {reply_markup: buttons});
        return ctx.wizard.next();
    },
    ctx => {
        ctx.wizard.state.remindData.dateData = ctx.message.text;
        ctx.reply('When?');
        return ctx.wizard.next();
    },
    async ctx => {
        ctx.wizard.state.remindData.dateData.time = ctx.message.text;
        ctx.reply('Thanks');
        await console.log(ctx.wizard.state.remindData);
        return ctx.scene.leave;
    }
);

module.exports = remindScene;