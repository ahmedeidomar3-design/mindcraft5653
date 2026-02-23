const mineflayer = require('mineflayer');

const bot = mineflayer.createBot({
    host: 'omar5843.aternos.me',
    port: 41748,
    username: 'Omar_24h_Bot',
    version: '1.20.1'
});

bot.on('spawn', () => {
    console.log('✅ البوت دخل! السيرفر مش هيقفل دلوقتي.');
    // حركة عشان أرتينوس ميعملش Kick
    setInterval(() => {
        if (bot.isSleeping) return;
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
        bot.look(bot.entity.yaw + 0.5, bot.entity.pitch);
    }, 20000);
});

bot.on('time', () => {
    if (!bot.time.isDay && !bot.isSleeping) {
        const bed = bot.findBlock({ matching: block => bot.isABed(block), maxDistance: 5 });
        if (bed) bot.sleep(bed).catch(() => {});
    }
});
