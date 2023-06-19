#include <Arduino.h>
#include "HX711.h"
#include <WiFi.h>
#include <PubSubClient.h>
#define DT_PIN 4
#define SCK_PIN 2


 
const char* ssid = "xxx";
const char* password =  "xxx";
const char* mqttServer = "IP";
const int mqttPort = 1883;
const char* mqttUser = "user44#$";
const char* mqttPassword = "a624**J#";
char* payload = ''
WiFiClient espClient;
PubSubClient client(espClient);
 
float offset = 0; //variável para guardar o valor bruto de offset
float offset_duo = 0;

HX711 scale;
 
void setup() {
  scale.begin(DT_PIN,SCK_PIN);
  Serial.begin(9600);
  offset = scale.read_average(128); //tira uma média de 3 amostras para o offset
  
  Serial.println("Before setting up the scale:");
  Serial.print("read: \t\t");
  Serial.println(scale.read());			// print a raw reading from the ADC

  Serial.print("read average: \t\t");
  Serial.println(scale.read_average(20));  	// print the average of 20 readings from the ADC

  Serial.print("get value: \t\t");
  Serial.println(scale.get_value(5));		// print the average of 5 readings from the ADC minus the tare weight (not set yet)

  Serial.print("get units: \t\t");
  Serial.println(scale.get_units(5), 1);	// print the average of 5 readings from the ADC minus tare weight (not set) divided
						// by the SCALE parameter (not set yet)

  scale.set_scale(476.f);                      // this value is obtained by calibrating the scale with known weights; see the README for details
  scale.tare();				        // reset the scale to 0
  offset_duo = scale.get_units(10) - offset;
  offset_duo      /= 100 * -1; 

  Serial.println("COMECANDO MEDICAO");
  WiFi.begin(ssid, password);
 
  while (WiFi.waitForConnectResult() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
    Serial.println(WiFi.status());
  }
 
  Serial.println("Connected to the WiFi network");
 
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
  delay(2000);
  client.publish("quizz", String(alternativa).c_str() );
}