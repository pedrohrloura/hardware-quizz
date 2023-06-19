import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/loading.service';

export interface Question {
  id?: number;
  cabecalho: string;
  id_template?: number,
  opcao_1: string,
  opcao_2: string,
  opcao_3: string,
  opcao_4: string,
  opcao_correta: string,
  expanded?: boolean;
  duracao?: number;
}

export interface Template {
  id?: number,
  dificuldade: string;
  materia: string;
  nome_template: string;
}

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss'],
})


export class AddTemplateComponent implements OnInit {

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
  ) { }

  panelOpenState = false;
  faTrash = faTrash;
  faPlus = faPlus;
  perguntas: Question[] = [
    {
      cabecalho: 'Pergunta 1',
      expanded: false,
      opcao_1: "Opção 1",
      opcao_2: "Opção 2",
      opcao_3: "Opção 3",
      opcao_4: "Opção 4",
      opcao_correta: "1",
      duracao: 40,
    }
  ];

  templateId: number = 0;
  templates: any;
  template: Template = {
    dificuldade: "",
    materia: "",
    nome_template: ""
  }

  columnsToDisplay = ['id', 'pergunta', 'actions'];
  isExpanded = (index: number, item: Question) => item.expanded;

  async ngOnInit() {
    this.loadingService.show();
    this.templateId = this.route.snapshot.params['id'] ?? 0;
    if (this.templateId) {
      this.templates = await this.appService.get("/get/templates");
      this.template = this.templates.find((x: any) => x.id == this.templateId);
      let data: any = (await this.appService.get("/get/perguntas"));
      this.perguntas = data.filter((x: any) => x.id_template == this.templateId);
    }
    this.loadingService.hide();
  }

  public removeItem(index: number) {
    this.perguntas.splice(index, 1);
  }

  public addItem() {
    let newQuestion: Question = {
      cabecalho: 'Nova pergunta',
      expanded: true,
      opcao_1: "Opção 1",
      opcao_2: "Opção 2",
      opcao_3: "Opção 3",
      opcao_4: "Opção 4",
      opcao_correta: "1",      
      duracao: 40,
    }
    this.perguntas.push(newQuestion);
  }

  async saveTemplate() {
    this.loadingService.show();
    if (this.templateId) {
      await this.appService.put("/edit/templates", this.template);
      await this.appService.delete("/delete/perguntas/id_template", this.formatQuestionPayload(this.perguntas)[0]);

      if (this.perguntas.length) await this.appService.post("/create/perguntas", this.formatQuestionPayload(this.perguntas));
    }
    else {
      let template = await this.appService.post("/create/templates", this.template)
      if (this.perguntas.length) await this.appService.post("/create/perguntas", this.formatQuestionPayload(this.perguntas, template.id));
    }
    this.loadingService.hide();
    this.router.navigate(["/templates"]);
  }

  formatQuestionPayload(question: Question[], id?: number) {
    question.forEach(x => {
      delete x.expanded;
      x.id_template = id ? id : this.templateId;
    });
    return question;

  }
  
}
