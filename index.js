const mineflayer = require('mineflayer')

const botArgs = {
  host: 'omar5843.aternos.me', 
  port: 41748,                 
  username: 'Gemini_Hero',     
  version: false,              
  connectTimeout: 60000,
  keepAlive: true
}

let bot;

function createBot() {
  bot = mineflayer.createBot(botArgs)

  bot.on('spawn', () => {
    console.log('✅ البوت دخل السيرفر بنجاح!')
    
    // ميزة النط المستمر لمنع الطرد AFK
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      
      const walk = Math.random() > 0.5 ? 'left' : 'right'
      bot.setControlState(walk, true)
      setTimeout(() => bot.setControlState(walk, false), 1000)
    }, 15000)
  })

  // ميزة النوم التلقائي فور حلول الليل
  bot.on('time', () => {
    if (bot.time.isDay) return
    const bed = bot.findBlock({ matching: block => bot.isABed(block), maxDistance: 5 })
    if (bed) {
      bot.sleep(bed).catch(err => console.log('😴 محاولة نوم: ' + err.message))
    }
  })

  // إعادة الاتصال التلقائي لو السيرفر قفل أو رستر
  bot.on('error', (err) => console.log('❌ خطأ: ' + err.message))
  bot.on('end', () => {
    console.log('🔄 السيرفر فصل.. جاري إعادة المحاولة خلال 30 ثانية...')
    setTimeout(createBot, 30000)
  })
}

createBot()
