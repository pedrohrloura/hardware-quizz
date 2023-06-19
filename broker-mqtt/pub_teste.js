
var mqtt = require('mqtt');
var client  = mqtt.connect('mqtt://IP:1883');
client.on('connect', function () {
setInterval(function() {

const dictionary = [{
  resposta_tentativa: '4',
  id_dispositivo: 3
}];


const dictionaryString = JSON.stringify(dictionary);
client.publish('quizz', dictionaryString);
console.log('Message Sent');
}, 2500);
});