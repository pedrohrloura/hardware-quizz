import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMqttServiceOptions } from 'ngx-mqtt';
import { MqttService } from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'IP',
  port: 3000,
  path: '/mqtt'
};

@Injectable({
  providedIn: 'root'
})

export class AppService {
  baseApiUrl: string = "http://127.0.0.1:5000";

  constructor(private http: HttpClient, private mqttService: MqttService) { }

  get(entity: string) {
    return new Promise((resolve) => {
      this.http.get<any[]>(this.baseApiUrl + entity)
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  post(entity: string, body: any): any {
    return new Promise((resolve) => {
      this.http.post<any[]>(this.baseApiUrl + entity, body)
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  put(entity: string, body: any): any {
    return new Promise((resolve) => {
      this.http.put<any[]>(this.baseApiUrl + entity, body)
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  delete(entity: string, body: any): any {
    return new Promise((resolve) => {
      this.http.delete<any>(this.baseApiUrl + entity, { body: body })
        .subscribe(data => {
          resolve(data);
        });
    });
  }

  publishMqtt(topico: string, mensagem: string): any {
    this.mqttService.publish(topico, mensagem).subscribe({
      complete: () => {
        console.log('Mensagem publicada com sucesso!');
      },
      error: (error: Error) => {
        console.log('Erro ao publicar mensagem:', error);
      }
    });
  }
}
