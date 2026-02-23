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

  // --- ميزة النط ومنع الطرد (Anti-AFK) ---
  bot.on('spawn', () => {
    console.log('✅ البوت دخل السيرفر بنجاح!')
    bot.chat('أنا جيت! شغال 24 ساعة ونط ونوم بالليل.')
    
    setInterval(() => {
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      
      const walk = Math.random() > 0.5 ? 'left' : 'right'
      bot.setControlState(walk, true)
      setTimeout(() => bot.setControlState(walk, false), 1000)
    }, 15000)
  })

  // --- ميزة النوم التلقائي بالليل ---
  bot.on('time', () => {
    if (bot.time.isDay) return
    const bed = bot.findBlock({ matching: block => bot.isABed(block), maxDistance: 5 })
    if (bed) {
      bot.sleep(bed).catch(err => console.log('😴 مشكلة في النوم: ' + err.message))
    }
  })

  // --- ميزة الرد التلقائي في الشات ---
  bot.on('chat', (username, message) => {
    if (username === bot.username) return
    if (message.includes('hello') || message.includes('هلا')) {
      bot.chat(`أهلاً يا ${username}! أنا بوت جيميناي المطوّر.`)
    }
  })

  // --- إعادة الاتصال التلقائي (مهمة جداً) ---
  bot.on('error', (err) => console.log('❌ خطأ: ' + err.message))
  bot.on('end', () => {
    console.log('🔄 السيرفر فصل.. جاري إعادة المحاولة خلال 30 ثانية...')
    setTimeout(createBot, 30000)
  })
}

createBot()
