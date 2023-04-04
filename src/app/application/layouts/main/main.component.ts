import { Component, OnInit } from '@angular/core';

export interface ISideMenu {
  title: string;
  icon: string;
  router?: string;
  children: ISideMenu[];
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isCollapsed = false;
  public sideMenu: ISideMenu[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      router: 'session/dashboard',
      children: [],
    },
    {
      title: 'Alunos',
      icon: 'usergroup-add',
      children: [
        {
          title: 'Consultar Alunos',
          router: 'session/aluno/consultar',
          icon: 'user',
          children: [],
        },
      ],
    },
    {
      title: 'Livros',
      icon: 'dashboard',
      children: [
        {
          title: 'Dashboard2',
          router: 'session/coisa',
          icon: 'dashboard',
          children: [],
        },
      ],
    },
  ];
  constructor() {}

  ngOnInit(): void {
    this.sideMenu[0].children?.length;
  }
}
