// Mosca MQTT broker

var mosca = require('mosca')
var settings = {port: 1883,
    http: {
        port: 3000,  // WebSocket port
        bundle: true,
        static: './'  // Serve static files from the current directory
      }
}
var broker = new mosca.Server(settings)

broker.on('ready', ()=>{
    console.log('Broker is ready!')
})

broker.on('published', (packet)=>{
    message = packet.payload.toString()
    console.log(message)
})