import { Component, OnInit } from '@angular/core';
import { faCircle, faStar, faSquare, faDiamond, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from 'src/app/loading.service';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  constructor(
    private loadingService: LoadingService,
    private appService: AppService,
    private route: ActivatedRoute,
  ) { }

  faCircle = faCircle;
  faStar = faStar;
  faSquare = faSquare;
  faDiamond = faDiamond;
  faTrophy = faTrophy;
  template: any;
  lobby: any;
  results: any;
  finish: any = false;
  perguntas: any;
  lobbyId: any;
  indexQuestion: number = 0;
  ready: boolean = false;
  finishQuestion: boolean = false;

  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  seconds: number = 0;
  value: number = 100;

  remainingTime: string = "";

  async ngOnInit(): Promise<void> {
    this.loadingService.show();
    this.lobbyId = this.route.snapshot.params['id'] ?? 0;
    let lobbys: any = await this.appService.get("/get/quiz");
    this.lobby = lobbys.find((x: any) => x.id == this.lobbyId);
    let templates: any = await this.appService.get("/get/templates");
    this.template = templates.find((x: any) => x.id == this.lobby.id_template);
    let perguntas: any = await this.appService.get("/get/perguntas");
    this.perguntas = perguntas.filter((x: any) => x.id_template == this.lobby.id_template);
    this.loadingService.hide();
    this.ready = true;
    this.startCountdown();
  }

  startCountdown() {
    this.seconds = this.perguntas[this.indexQuestion].duracao;
    this.value = this.seconds / this.perguntas[this.indexQuestion].duracao * 100;
    const intervalId = setInterval(async () => {
      this.seconds--;
      this.value = this.seconds / this.perguntas[this.indexQuestion].duracao * 100;
      if (this.seconds <= 0) {
        clearInterval(intervalId);
        this.remainingTime = '0:00';
        this.finishQuestion = true;
        this.appService.publishMqtt("quiz_manager", `{"id_quiz": ${this.lobby.id}, "id_pergunta": ${this.perguntas[this.indexQuestion].id}, "status":"end"}`)
        this.lobby.pergunta_atual = null;
        this.loadingService.show();
        if (this.indexQuestion == this.perguntas.length - 1) {
          this.lobby.status_quiz = false;
          this.lobby.horario_limite = new Date();
        }
        this.lobby = await this.appService.put("/edit/quiz", this.lobby);
        this.loadingService.hide();
      } else {
        this.remainingTime = this.formatTime(this.seconds);
      }
    }, 1000);
  }

  async nextQuestion() {
    if (this.perguntas.length - 1 > this.indexQuestion) {
      this.loadingService.show();
      this.indexQuestion++;
      this.lobby.pergunta_atual = this.perguntas[this.indexQuestion].id;
      this.lobby = await this.appService.put("/edit/quiz", this.lobby);
      this.appService.publishMqtt("quiz_manager", `{"id_quiz": ${this.lobby.id}, "id_pergunta": ${this.perguntas[this.indexQuestion].id}, "status":"start"}`)
      this.finishQuestion = false;
      this.loadingService.hide();
      this.startCountdown();
    }
  }

  async viewResult() {
    this.loadingService.show();
    this.results = await this.appService.get("/getResult/" + this.lobby.id);
    this.finish = true;
    this.loadingService.hide();
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor((seconds / 60) % 60);
    return `${minutes}:${seconds % 60 < 10 ? "0" + seconds % 60 : seconds % 60}`;
  }
}
