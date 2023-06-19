import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/app.service';
import { LoadingService } from 'src/app/loading.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  constructor(
    private router: Router,
    private appService: AppService,
    public loadingService: LoadingService,
  ) { }

  faPlus = faPlus;
  rooms:any = [];
  templates: any =[];
  selectedTemplate?: number;

  async ngOnInit() {
    this.loadingService.show();
    this.rooms = await this.appService.get("/get/quiz");
    this.templates = await this.appService.get("/get/templates");
    this.loadingService.hide();
    console.log(this.rooms);
  }

  getStatusLabel(status: boolean | null): string {
    if (status === true) {
      return 'Em Andamento';
    } else if (status === false) {
      return 'Finalizada';
    } else {
      return 'Não Iniciada';
    }
  }

  getFormattedDateTime(dateTime: any): string {
    let newDate = new Date(dateTime)
    if (dateTime) {
      return newDate.toLocaleString();
    } else {
      return '-';
    }
  }

  enterRoom(id: number){
    return
  }
  startRoom(id: number){
    return
  }

  createNewRoom(){
    return
  }

  async createQuiz() {
    this.loadingService.show();
    let perguntas: any = await this.appService.get("/get/perguntas");
    perguntas = perguntas.filter((x: any) => x.id_template == this.selectedTemplate);
    let quiz: any = {
      id_template: Number(this.selectedTemplate),
      pergunta_atual: perguntas[0].id,
      horario_inicio: new Date(),
      horario_limite: undefined,
      status_quiz: true,
    }
    quiz = await this.appService.post("/create/quiz", quiz);
    this.loadingService.hide();
    this.router.navigateByUrl("/lobby/" + quiz.id)
  }
}
