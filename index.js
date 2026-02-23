const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'omar5843.aternos.me',
    port: 41748,
    username: 'Omar_24h_Bot',
    version: '1.20.1'
});

bot.on('spawn', () => {
    console.log('✅ البوت شغال الآن من سيرفرات GitHub!');
    setInterval(() => {
        if (bot.isSleeping) return;
        const actions = ['forward', 'back', 'left', 'right', 'jump'];
        const action = actions[Math.floor(Math.random() * actions.length)];
        bot.setControlState(action, true);
        setTimeout(() => bot.clearControlStates(), 1000);
    }, 30000);
});

bot.on('time', () => {
    if (!bot.time.isDay && !bot.isSleeping) {
        const bed = bot.findBlock({ matching: block => bot.isABed(block), maxDistance: 5 });
        if (bed) bot.sleep(bed).catch(() => {});
    }
});
