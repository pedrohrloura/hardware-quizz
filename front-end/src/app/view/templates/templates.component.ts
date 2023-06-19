import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faEdit, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AppService } from 'src/app/app.service';
import { LoadingService } from 'src/app/loading.service';
import { Template } from './add-template/add-template.component';

export interface Quiz {
  id?: number,
  id_template: number,
  pergunta_atual: number,
  horario_inicio?: Date,
  horario_limite?: Date,
  status_quiz: boolean,
}

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  constructor(
    private router: Router,
    private appService: AppService,
    public loadingService: LoadingService,
  ) { }

  templates: any;
  clickedTemplate: any;

  faTrash = faTrash;
  faEdit = faEdit;
  faPlay = faPlay;
  faPlus = faPlus;

  async ngOnInit() {
    this.loadingService.show();
    this.templates = await this.appService.get("/get/templates");
    this.loadingService.hide();
    console.log(this.templates);
  }

  editTemplate(data: Template) {
    this.router.navigate(['/templates/edit/' + data.id], { state: { data: data } });
  }

  async deleteTemplate() {
    this.loadingService.show();
    await this.appService.delete("/delete/templates", this.clickedTemplate);
    this.templates = await this.appService.get("/get/templates");
    this.loadingService.hide();
  }

  async playTemplate(template: Template) {
    this.loadingService.show();
    let perguntas: any = await this.appService.get("/get/perguntas");
    perguntas = perguntas.filter((x: any) => x.id_template == template.id);
    let quiz: Quiz = {
      id_template: Number(template.id),
      pergunta_atual: perguntas[0].id,
      horario_inicio: new Date(),
      horario_limite: undefined,
      status_quiz: true,
    }
    quiz = await this.appService.post("/create/quiz", quiz);
    this.appService.publishMqtt("quiz_manager", `{"id_quiz": ${quiz.id}, "id_pergunta": ${perguntas[0].id}, "status": "start"}`)
    this.loadingService.hide();
    this.router.navigateByUrl("/lobby/" + quiz.id)
  }
}
