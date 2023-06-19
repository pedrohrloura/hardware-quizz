#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#define option_1 2
#define option_2 3
#define option_3 4
#define option_4 5


 
const char* ssid = "xxx";
const char* password =  "xxx";
const char* mqttServer = "IP";
const int mqttPort = 1883;
const char* mqttUser = "user44#$";
const char* mqttPassword = "a624**J#";
char* payload = ''
WiFiClient espClient;
PubSubClient client(espClient);
 

void setup() {

  Serial.begin(9600);
  WiFi.begin(ssid, password);
  //Conexao com a rede local
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
    Serial.println(WiFi.status());
  }
 
  Serial.println("Connected to the WiFi network");

  //Conexao com o servidor MQTT
  client.setServer(mqttServer, mqttPort);
 
  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");
 
    if (client.connect("ESP32Client")) {
 
      Serial.println("connected");
 
    } else {
 
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
 
  client.publish("esp/test", "Hello from ESP32");
 
}
   

void loop() {

  client.loop();
  if(digitalRead(option_1) == HIGH){
     Serial.println('1');
     client.publish("quizz", "[{resposta_tentativa: '1', id_dispositivo: 1}]" );
     delay(100);
  }
  if(digitalRead(option_2) == HIGH){
     Serial.println('2');
     client.publish("quizz", "[{resposta_tentativa: '2', id_dispositivo: 1}]" );
     delay(100);
  }
  if(digitalRead(option_3) == HIGH){
     Serial.println('3');
     client.publish("quizz", "[{resposta_tentativa: '3', id_dispositivo: 1}]" );
     delay(100);
  }
  if(digitalRead(option_4) == HIGH){
     Serial.println('4');
     client.publish("quizz", "[{resposta_tentativa: '4', id_dispositivo: 1}]" );
     delay(100);
  }
  delay(500);
  
}